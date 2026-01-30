// YouTube API Types
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
}

// Search Filters
export interface SearchFilters {
  keywords: string;
  language: string;
  country: string;
  publishedAfter: string | null;
  publishedBefore: string | null;
  minViews: number;
  minLikes: number;
  minSubscribers: number;
  maxSubscribers: number | null;
  maxResults: number;
}

// Search Result with Outlier Score
export interface SearchResult {
  video: YouTubeVideo;
  channel: YouTubeChannel;
  outlierScore: number;
  scoreComponents: {
    viewRatio: number;
    engagementRate: number;
    velocityScore: number;
    channelPotential: number;
  };
}

// Saved Filter
export interface SavedFilter {
  id: string;
  name: string;
  filters: SearchFilters;
  createdAt: string;
  updatedAt: string;
}

// Favorite
export interface Favorite {
  id: string;
  videoId: string;
  channelId: string;
  metadata: {
    videoTitle: string;
    channelTitle: string;
    thumbnailUrl: string;
    viewCount: number;
    subscriberCount: number;
    savedAt: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  quota?: {
    used: number;
    remaining: number;
  };
}

// Language & Country Options
export const LANGUAGE_OPTIONS = [
  { value: "", label: "Todos os idiomas" },
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "zh", label: "中文" },
] as const;

export const COUNTRY_OPTIONS = [
  { value: "", label: "Todos os países" },
  { value: "BR", label: "Brasil" },
  { value: "US", label: "Estados Unidos" },
  { value: "PT", label: "Portugal" },
  { value: "ES", label: "Espanha" },
  { value: "MX", label: "México" },
  { value: "AR", label: "Argentina" },
  { value: "GB", label: "Reino Unido" },
  { value: "DE", label: "Alemanha" },
  { value: "FR", label: "França" },
  { value: "IT", label: "Itália" },
  { value: "JP", label: "Japão" },
  { value: "KR", label: "Coreia do Sul" },
  { value: "IN", label: "Índia" },
] as const;

// Default Filters
export const DEFAULT_FILTERS: SearchFilters = {
  keywords: "",
  language: "",
  country: "",
  publishedAfter: null,
  publishedBefore: null,
  minViews: 0,
  minLikes: 0,
  minSubscribers: 0,
  maxSubscribers: null,
  maxResults: 50,
};
