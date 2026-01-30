// Earnings Estimation Utility
// Based on industry CPM ranges and YouTube revenue share model
// Formula aligned with Social Blade methodology

export interface EarningsEstimate {
  monthlyMin: number
  monthlyMax: number
  confidence: "low" | "medium" | "high"
  monthlyViews: number
}

// CPM ranges by niche (USD per 1000 views)
// These are GROSS CPM ranges (before YouTube's cut)
const CPM_RANGES = {
  default: { min: 0.25, max: 4.0 },
  music: { min: 0.5, max: 2.0 },
  gaming: { min: 0.5, max: 3.0 },
  finance: { min: 3.0, max: 12.0 },
  tech: { min: 2.0, max: 8.0 },
  education: { min: 2.0, max: 6.0 },
  lifestyle: { min: 1.0, max: 4.0 },
  entertainment: { min: 0.5, max: 3.0 },
} as const

/**
 * Estimates monthly channel earnings based on public view data
 * 
 * NEW APPROACH: We estimate "recent monthly views" by assuming that
 * recent videos represent the channel's current activity level.
 * This aligns better with Social Blade's methodology which uses
 * actual 30-day view data.
 * 
 * Formula: Social Blade uses views/30 days * CPM range
 * We estimate this by using total views with a recency weighting
 * 
 * @param totalViews - Total channel views
 * @param channelAge - Days since channel creation (NOT USED - kept for compatibility)
 * @param recentVideoViews - Optional: views of the most recent video (better estimate)
 * @param niche - Optional content niche for adjusted CPM
 */
export function estimateMonthlyEarnings(
  totalViews: number,
  channelAge: number,
  recentVideoViews?: number,
  niche?: keyof typeof CPM_RANGES
): EarningsEstimate {
  // IMPROVED CALCULATION:
  // Instead of dividing total views by channel age,
  // we estimate monthly views using a more realistic approach
  
  let estimatedMonthlyViews: number
  
  if (recentVideoViews && recentVideoViews > 0) {
    // If we have recent video data, assume this represents
    // roughly 1/4 of monthly views (assuming ~4 videos/month)
    estimatedMonthlyViews = recentVideoViews * 4
  } else {
    // Fallback: estimate based on total views
    // Key insight: Active channels tend to get 60-80% of their views
    // from recent content. We apply a recency factor.
    
    // For channels with <500k total views, assume they're newer and
    // getting more recent traction (higher monthly ratio)
    const monthsActive = Math.max(channelAge / 30, 1)
    const baseMonthlyViews = totalViews / monthsActive
    
    // Apply recency factor: newer channels often have increasing viewership
    // We add a minimum floor based on total views to avoid underestimation
    const minimumMonthlyEstimate = totalViews * 0.15 // Assume at least 15% of total views per month for active channels
    
    estimatedMonthlyViews = Math.max(baseMonthlyViews, minimumMonthlyEstimate)
  }

  // Get CPM range for niche
  const cpm = CPM_RANGES[niche || "default"]

  // SIMPLIFIED CALCULATION (matches Social Blade approach):
  // Social Blade formula: (views/1000) * CPM range
  // No additional "monetized ratio" factor - CPM already accounts for this
  
  const monthlyMin = (estimatedMonthlyViews / 1000) * cpm.min
  const monthlyMax = (estimatedMonthlyViews / 1000) * cpm.max

  // Determine confidence level
  let confidence: EarningsEstimate["confidence"]
  if (recentVideoViews) {
    confidence = "high"
  } else if (estimatedMonthlyViews > 50000) {
    confidence = "medium"
  } else {
    confidence = "low"
  }

  return {
    monthlyMin: Math.round(monthlyMin),
    monthlyMax: Math.round(monthlyMax),
    confidence,
    monthlyViews: Math.round(estimatedMonthlyViews),
  }
}

/**
 * Formats earnings range as a readable string
 */
export function formatEarningsRange(estimate: EarningsEstimate): string {
  if (estimate.monthlyMax < 1) {
    return "< $1"
  }
  return `$${estimate.monthlyMin.toLocaleString()} - $${estimate.monthlyMax.toLocaleString()}`
}

/**
 * Generates Social Blade URL for a channel
 */
export function getSocialBladeUrl(channelId: string): string {
  return `https://socialblade.com/youtube/channel/${channelId}`
}

/**
 * Gets confidence color class
 */
export function getConfidenceColor(confidence: EarningsEstimate["confidence"]): string {
  switch (confidence) {
    case "high":
      return "text-green-400"
    case "medium":
      return "text-yellow-400"
    case "low":
      return "text-orange-400"
  }
}

/**
 * Formats view count with K/M suffix
 */
export function formatViewsCompact(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`
  }
  return views.toString()
}
