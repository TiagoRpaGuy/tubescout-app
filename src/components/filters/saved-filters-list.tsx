"use client"

import { useState, useEffect } from "react"
import { Folder, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  formatSavedFilterDate,
  SavedFilter,
} from "@/lib/saved-filters"
import { SMART_PRESETS } from "@/lib/presets"

interface SavedFiltersListProps {
  onLoadFilter: (filter: SavedFilter) => void
  refreshTrigger?: number
}

export function SavedFiltersList({ onLoadFilter, refreshTrigger }: SavedFiltersListProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SavedFilter[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load filters from API
  useEffect(() => {
    async function loadFilters() {
      try {
        const response = await fetch("/api/filters")
        
        if (response.ok) {
          try {
            const data = await response.json()
            setFilters(data.data || [])
          } catch (jsonError) {
            console.error("Erro ao processar resposta da API de filtros:", jsonError)
            // Não quebra a UI, apenas loga
          }
        } else {
            console.warn("API de filtros retornou erro:", response.status)
        }
      } catch (error) {
        console.error("Falha na conexão ao carregar filtros", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadFilters()
  }, [refreshTrigger]) 

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation() 
    
    // Optimistic update
    setFilters(prev => prev.filter(f => f.id !== id))
    
    try {
      await fetch(`/api/filters?id=${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Failed to delete filter", error)
    }
  }

  const getPresetIcon = (presetId?: string) => {
    if (!presetId) return null
    const preset = SMART_PRESETS.find((p) => p.id === presetId)
    return preset?.icon
  }

  if (filters.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-primary" />
          <span className="font-medium">Meus Filtros Salvos</span>
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <span className="text-xs text-muted-foreground">
              ({filters.length})
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* List */}
      {isExpanded && (
        <div className="border-t border-border p-2 space-y-1">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center justify-between rounded-md p-2 hover:bg-secondary/30 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {getPresetIcon(filter.presetId) && (
                    <span className="text-sm">{getPresetIcon(filter.presetId)}</span>
                  )}
                  <span className="font-medium text-sm truncate">
                    {filter.name}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  &ldquo;{filter.keyword}&rdquo; • {formatSavedFilterDate(filter.createdAt)}
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLoadFilter(filter)}
                >
                  Carregar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleDelete(filter.id, e)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
