import { SearchFilters, YouTubeVideo, YouTubeChannel, SearchResult } from "@/types"

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"

interface YouTubeSearchResponse {
  items: Array<{
    id: { videoId: string }
    snippet: {
      title: string
      description: string
      channelId: string
      channelTitle: string
      publishedAt: string
      thumbnails: {
        high?: { url: string }
        medium?: { url: string }
      }
    }
  }>
  nextPageToken?: string
}

interface YouTubeVideoDetailsResponse {
  items: Array<{
    id: string
    statistics: {
      viewCount: string
      likeCount: string
      commentCount: string
    }
    contentDetails: {
      duration: string
    }
  }>
}

interface YouTubeChannelResponse {
  items: Array<{
    id: string
    snippet: {
      title: string
      description: string
      thumbnails: {
        high?: { url: string }
        medium?: { url: string }
      }
    }
    statistics: {
      subscriberCount: string
      videoCount: string
      viewCount: string
    }
  }>
}

// Simple in-memory cache for channels (reduces API calls)
const channelCache = new Map<string, { data: YouTubeChannel; timestamp: number }>()
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

function getCachedChannel(channelId: string): YouTubeChannel | null {
  const cached = channelCache.get(channelId)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  return null
}

function cacheChannel(channel: YouTubeChannel): void {
  channelCache.set(channel.id, { data: channel, timestamp: Date.now() })
}

export class YouTubeClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async search(filters: SearchFilters): Promise<SearchResult[]> {
    // Step 1: Search for videos
    // OPTIMIZATION: Always fetch 50 items (max allowed) to have a better pool for outlier detection.
    // The quota cost is the same (100 units) whether we fetch 1 or 50.
    const searchParams = new URLSearchParams({
      part: "snippet",
      type: "video",
      maxResults: "50",
      q: filters.keywords,
      key: this.apiKey,
    })

    if (filters.language) {
      searchParams.set("relevanceLanguage", filters.language)
    }
    if (filters.country) {
      searchParams.set("regionCode", filters.country)
    }
    if (filters.publishedAfter) {
      searchParams.set("publishedAfter", new Date(filters.publishedAfter).toISOString())
    }
    if (filters.publishedBefore) {
      searchParams.set("publishedBefore", new Date(filters.publishedBefore).toISOString())
    }

    const searchResponse = await fetch(
      `${YOUTUBE_API_BASE}/search?${searchParams.toString()}`
    )
    
    if (!searchResponse.ok) {
      const error = await searchResponse.json()
      throw new Error(error.error?.message || "YouTube API search failed")
    }

    const searchData: YouTubeSearchResponse = await searchResponse.json()
    const videoIds = searchData.items.map((item) => item.id.videoId)

    if (videoIds.length === 0) {
      return []
    }

    // Step 2: Get video details (batched - up to 50 IDs per request)
    const videoDetails = await this.getVideoDetails(videoIds)

    // Step 3: Get unique channel IDs and fetch channel details
    const uniqueChannelIds = [...new Set(searchData.items.map((item) => item.snippet.channelId))]
    const channelDetails = await this.getChannelDetails(uniqueChannelIds)

    // Step 4: Build results with post-processing filters
    const results: SearchResult[] = []

    // Ensure all filter values are numbers to avoid string comparison bugs
    const minViews = Number(filters.minViews) || 0
    const minLikes = Number(filters.minLikes) || 0
    const minSubs = Number(filters.minSubscribers) || 0
    const maxSubs = filters.maxSubscribers ? Number(filters.maxSubscribers) : Infinity

    for (const searchItem of searchData.items) {
      const videoId = searchItem.id.videoId
      const videoDetail = videoDetails.get(videoId)
      const channel = channelDetails.get(searchItem.snippet.channelId)

      if (!videoDetail || !channel) continue

      const video: YouTubeVideo = {
        id: videoId,
        title: searchItem.snippet.title,
        description: searchItem.snippet.description,
        channelId: searchItem.snippet.channelId,
        channelTitle: searchItem.snippet.channelTitle,
        publishedAt: searchItem.snippet.publishedAt,
        thumbnailUrl: searchItem.snippet.thumbnails.high?.url || searchItem.snippet.thumbnails.medium?.url || "",
        viewCount: parseInt(videoDetail.statistics.viewCount) || 0,
        likeCount: parseInt(videoDetail.statistics.likeCount) || 0,
        commentCount: parseInt(videoDetail.statistics.commentCount) || 0,
        duration: videoDetail.contentDetails.duration,
      }

      // Apply post-processing filters
      if (video.viewCount < minViews) continue
      if (video.likeCount < minLikes) continue
      if (channel.subscriberCount < minSubs) continue
      if (channel.subscriberCount > maxSubs) continue

      // Calculate outlier score
      const scoreComponents = this.calculateOutlierComponents(video, channel)
      const outlierScore = this.calculateFinalScore(scoreComponents)

      results.push({
        video,
        channel,
        outlierScore,
        scoreComponents,
      })
    }

    // Sort by outlier score (highest first) and limit to requested amount
    const requestedMaxResults = Number(filters.maxResults) || 50
    return results
      .sort((a, b) => b.outlierScore - a.outlierScore)
      .slice(0, requestedMaxResults)
  }

  private async getVideoDetails(videoIds: string[]): Promise<Map<string, YouTubeVideoDetailsResponse["items"][0]>> {
    const detailsMap = new Map<string, YouTubeVideoDetailsResponse["items"][0]>()

    // Batch in groups of 50
    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50)
      const params = new URLSearchParams({
        part: "statistics,contentDetails",
        id: batch.join(","),
        key: this.apiKey,
      })

      const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params.toString()}`)
      if (response.ok) {
        const data: YouTubeVideoDetailsResponse = await response.json()
        for (const item of data.items) {
          detailsMap.set(item.id, item)
        }
      }
    }

    return detailsMap
  }

  private async getChannelDetails(channelIds: string[]): Promise<Map<string, YouTubeChannel>> {
    const channelMap = new Map<string, YouTubeChannel>()

    // Check cache first
    const uncachedIds: string[] = []
    for (const id of channelIds) {
      const cached = getCachedChannel(id)
      if (cached) {
        channelMap.set(id, cached)
      } else {
        uncachedIds.push(id)
      }
    }

    // Fetch uncached channels
    if (uncachedIds.length > 0) {
      for (let i = 0; i < uncachedIds.length; i += 50) {
        const batch = uncachedIds.slice(i, i + 50)
        const params = new URLSearchParams({
          part: "snippet,statistics",
          id: batch.join(","),
          key: this.apiKey,
        })

        const response = await fetch(`${YOUTUBE_API_BASE}/channels?${params.toString()}`)
        if (response.ok) {
          const data: YouTubeChannelResponse = await response.json()
          for (const item of data.items) {
            const channel: YouTubeChannel = {
              id: item.id,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || "",
              subscriberCount: parseInt(item.statistics.subscriberCount) || 0,
              videoCount: parseInt(item.statistics.videoCount) || 0,
              viewCount: parseInt(item.statistics.viewCount) || 0,
            }
            channelMap.set(item.id, channel)
            cacheChannel(channel)
          }
        }
      }
    }

    return channelMap
  }

  private calculateOutlierComponents(
    video: YouTubeVideo,
    channel: YouTubeChannel
  ): SearchResult["scoreComponents"] {
    // View Ratio: How many views compared to channel average
    const avgChannelViews = channel.viewCount / Math.max(channel.videoCount, 1)
    const viewRatio = Math.min(video.viewCount / Math.max(avgChannelViews, 1), 10)

    // Engagement Rate: Likes per 100 views
    const engagementRate = (video.likeCount / Math.max(video.viewCount, 1)) * 100

    // Velocity Score: Views per day since publish
    const daysSincePublish = Math.max(
      (Date.now() - new Date(video.publishedAt).getTime()) / (1000 * 60 * 60 * 24),
      1
    )
    const velocityScore = video.viewCount / daysSincePublish

    // Channel Potential: Smaller channels = higher potential (inverse log scale)
    const channelPotential = 1 / Math.log10(Math.max(channel.subscriberCount, 10) + 1)

    return {
      viewRatio,
      engagementRate,
      velocityScore,
      channelPotential,
    }
  }

  private calculateFinalScore(components: SearchResult["scoreComponents"]): number {
    const weights = { view: 0.4, velocity: 0.3, engagement: 0.2, potential: 0.1 }

    // Normalize each component to 0-100 scale
    const normalizedView = Math.min(components.viewRatio * 10, 100)
    const normalizedVelocity = Math.min(Math.log10(components.velocityScore + 1) * 20, 100)
    const normalizedEngagement = Math.min(components.engagementRate * 10, 100)
    const normalizedPotential = Math.min(components.channelPotential * 1000, 100)

    const score =
      normalizedView * weights.view +
      normalizedVelocity * weights.velocity +
      normalizedEngagement * weights.engagement +
      normalizedPotential * weights.potential

    return Math.round(score * 10) / 10
  }
}
