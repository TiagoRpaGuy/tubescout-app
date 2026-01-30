// Saved Filters - LocalStorage Management

export interface SavedFilter {
  id: string
  name: string
  keyword: string
  filters: {
    minViews: number
    minLikes: number
    minSubscribers: number
    maxSubscribers: number | null
    publishedAfterDays: number | null
    maxResults: number
  }
  presetId?: string
  createdAt: string
}

const STORAGE_KEY = "vidradar_saved_filters"

/**
 * Generate unique ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Get all saved filters from LocalStorage
 */
export function getSavedFilters(): SavedFilter[] {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Save a new filter to LocalStorage
 */
export function saveFilter(
  name: string,
  keyword: string,
  filters: SavedFilter["filters"],
  presetId?: string
): SavedFilter {
  const newFilter: SavedFilter = {
    id: generateId(),
    name,
    keyword,
    filters,
    presetId,
    createdAt: new Date().toISOString(),
  }
  
  const existing = getSavedFilters()
  const updated = [...existing, newFilter]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return newFilter
}

/**
 * Delete a saved filter by ID
 */
export function deleteFilter(id: string): void {
  const existing = getSavedFilters()
  const updated = existing.filter((f) => f.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

/**
 * Format date for display
 */
export function formatSavedFilterDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
