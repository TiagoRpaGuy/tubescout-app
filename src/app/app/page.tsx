"use client"

import { useState } from "react"
import { SearchFiltersForm } from "@/components/filters/search-filters-form"
import { PresetChips } from "@/components/filters/preset-chips"
import { SaveFilterModal } from "@/components/filters/save-filter-modal"
import { SavedFiltersList } from "@/components/filters/saved-filters-list"
import { VideoCard } from "@/components/results/video-card"
import { SupportWidgets } from "@/components/support-widgets"
import { UsageBanner } from "@/components/usage-banner"
import { ApiKeyWarning } from "@/components/api-key-warning"
import { SearchFilters, SearchResult } from "@/types"
import { SavedFilter } from "@/lib/saved-filters"
import { FilterPreset, applyPresetToFilters } from "@/lib/presets"
import { Search, TrendingUp } from "lucide-react"

export default function AppPage() {
  // Estado da aplicação
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters | null>(null)
  const [presetFields, setPresetFields] = useState<Set<string>>(new Set())
  const [keyword, setKeyword] = useState("")
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // TODO: Get from user settings/Supabase
  const hasApiKey = true // Assume has API key for now
  const searchesLeft = 5
  const aiAnalysesLeft = 3
  const isPro = false

  // Busca de vídeos
  const handleSearch = async (filters: SearchFilters) => {
    if (!hasApiKey) return
    
    setIsLoading(true)
    setAppliedFilters(filters)

    try {
      const response = await fetch("/api/youtube/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      })
      
      if (response.ok) {
        const data = await response.json()
        setResults(data.results || [])
      }
    } catch (error) {
      console.error("Erro na busca:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Limpar resultados
  const handleClear = () => {
    setResults([])
    setAppliedFilters(null)
    setPresetFields(new Set())
    setSelectedPreset(null)
  }

  // Aplicar preset
  const handleSelectPreset = (preset: FilterPreset) => {
    setSelectedPreset(preset.id)
    // Apply preset using the helper function
    const newFilters = applyPresetToFilters(preset, keyword)
    setAppliedFilters(newFilters)
  }

  // Limpar preset
  const handleClearPreset = () => {
    setSelectedPreset(null)
    setPresetFields(new Set())
  }

  // Aplicar filtro salvo
  const handleLoadSavedFilter = (filter: SavedFilter) => {
    // Convert SavedFilter.filters to SearchFilters
    const searchFilters: SearchFilters = {
      keywords: filter.keyword,
      language: "",
      country: "",
      publishedAfter: filter.filters.publishedAfterDays 
        ? new Date(Date.now() - filter.filters.publishedAfterDays * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
        : "",
      publishedBefore: "",
      minViews: filter.filters.minViews,
      minLikes: filter.filters.minLikes,
      minSubscribers: filter.filters.minSubscribers,
      maxSubscribers: filter.filters.maxSubscribers ?? undefined,
      maxResults: filter.filters.maxResults,
    }
    setAppliedFilters(searchFilters)
    setPresetFields(new Set())
    setSelectedPreset(null)
  }

  // Favoritar vídeo
  const handleFavorite = (result: SearchResult) => {
    // TODO: Implement favorite logic with Supabase
    console.log("Favoritar:", result.video.title)
  }

  return (
    <div className="space-y-8">
      {/* Alertas - Full Width */}
      <ApiKeyWarning hasApiKey={hasApiKey} />
      <UsageBanner 
        searchesLeft={searchesLeft}
        aiAnalysesLeft={aiAnalysesLeft}
        isPro={isPro}
      />

      {/* Presets - Filtros Rápidos */}
      <PresetChips 
        selectedPreset={selectedPreset}
        onSelectPreset={handleSelectPreset}
        onClearPreset={handleClearPreset}
        disabled={isLoading}
        keywordMissing={!keyword.trim()}
      />

      {/* Formulário de Busca - Card Principal */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Buscar Vídeos Outliers</h1>
            <p className="text-base text-muted-foreground">
              Encontre vídeos que estão viralizando antes da concorrência
            </p>
          </div>
        </div>

        <SearchFiltersForm
          onSearch={handleSearch}
          onClear={handleClear}
          onSave={() => setShowSaveModal(true)}
          isLoading={isLoading}
          externalFilters={appliedFilters}
          presetFields={presetFields}
          onKeywordChange={setKeyword}
        />
      </div>

      {/* Filtros Salvos - Collapsible Section */}
      <SavedFiltersList 
        onLoadFilter={handleLoadSavedFilter}
        refreshTrigger={refreshTrigger}
      />

      {/* Resultados */}
      {results.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              {results.length} vídeos encontrados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((result) => (
              <VideoCard 
                key={result.video.id} 
                result={result}
                onFavorite={handleFavorite}
                isFavorited={false}
              />
            ))}
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-20">
            <div className="inline-flex h-20 w-20 rounded-full bg-muted items-center justify-center mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Nenhuma busca realizada ainda
            </h3>
            <p className="text-base text-muted-foreground max-w-lg mx-auto">
              Use os filtros acima para descobrir vídeos outliers no YouTube.
              Configure sua API Key se ainda não configurou.
            </p>
          </div>
        )
      )}

      {/* Modal Salvar Filtro */}
      {showSaveModal && appliedFilters && (
        <SaveFilterModal
          filters={appliedFilters}
          onClose={() => {
            setShowSaveModal(false)
            setRefreshTrigger(prev => prev + 1)
          }}
        />
      )}

      {/* Widgets de Suporte */}
      <SupportWidgets />
    </div>
  )
}
