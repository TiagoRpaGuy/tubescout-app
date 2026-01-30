"use client"

import { useState, useEffect } from "react"
import { Search, X, Save, Filter, Calendar, Sparkles, Globe, Eye, ThumbsUp, Users, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SearchFilters,
  DEFAULT_FILTERS,
  LANGUAGE_OPTIONS,
  COUNTRY_OPTIONS,
} from "@/types"
import { cn } from "@/lib/utils"
import { InfoTooltip } from "@/components/ui/tooltip"

interface SearchFiltersFormProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
  onSave: () => void
  isLoading?: boolean
  externalFilters?: SearchFilters | null
  presetFields?: Set<string>
  onKeywordChange?: (keyword: string) => void
}

// Time period shortcuts
const TIME_SHORTCUTS = [
  { label: "Hoje", days: 0 },
  { label: "7d", days: 7 },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "1 ano", days: 365 },
]

export function SearchFiltersForm({
  onSearch,
  onClear,
  onSave,
  isLoading = false,
  externalFilters,
  presetFields,
  onKeywordChange,
}: SearchFiltersFormProps) {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  
  // Custom period state
  const [customPeriodValue, setCustomPeriodValue] = useState<number>(1)
  const [customPeriodUnit, setCustomPeriodUnit] = useState<string>("weeks")

  // Sync with external filters when preset is applied
  useEffect(() => {
    if (externalFilters) {
      setFilters(externalFilters)
    }
  }, [externalFilters])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!filters.keywords.trim()) {
      alert("Por favor, digite uma palavra-chave para buscar.")
      return
    }
    
    onSearch(filters)
  }

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS)
    onClear()
  }

  const setDateShortcut = (days: number) => {
    const today = new Date()
    const pastDate = new Date(today)
    pastDate.setDate(today.getDate() - days)
    
    setFilters({
      ...filters,
      publishedAfter: pastDate.toISOString().split("T")[0],
      publishedBefore: today.toISOString().split("T")[0],
    })
  }

  const applyCustomPeriod = () => {
    let days = customPeriodValue
    
    switch (customPeriodUnit) {
      case "weeks":
        days = customPeriodValue * 7
        break
      case "months":
        days = customPeriodValue * 30
        break
      case "years":
        days = customPeriodValue * 365
        break
    }
    
    setDateShortcut(days)
  }

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    
    if (key === "keywords" && onKeywordChange) {
      onKeywordChange(value as string)
    }
  }

  const isPresetField = (field: string) => presetFields?.has(field)

  const getInputClass = (field: string) =>
    cn(
      "pl-10", // Space for icon
      isPresetField(field) && "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
    )

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <Filter className="h-6 w-6 text-blue-500" />
          </div>
          <span>Filtros de Busca</span>
        </div>
        {presetFields && presetFields.size > 0 && (
          <div className="text-sm text-muted-foreground flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{presetFields.size} filtros automáticos</span>
          </div>
        )}
      </div>

      {/* Keywords - Required */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="keywords" className="flex items-center gap-2 text-base">
            Palavras-chave
            <span className="text-xs text-amber-500 font-normal bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Obrigatório</span>
          </Label>
          <InfoTooltip content="Digite o tema principal. Ex: 'Marketing Digital', 'Receitas Fit', 'React Tutorial'." />
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            id="keywords"
            placeholder="Ex: deep house, tutorial, review..."
            value={filters.keywords}
            onChange={(e) => updateFilter("keywords", e.target.value)}
            className={cn(
              "pl-10 h-14 text-lg shadow-sm transition-all focus:ring-2 focus:ring-primary/20",
              !filters.keywords.trim() && "border-amber-500/30 bg-amber-500/5 focus-visible:ring-amber-500/20"
            )}
            required
            autoFocus
          />
        </div>
        {!filters.keywords.trim() && (
          <p className="text-sm text-amber-500 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Digite uma palavra-chave para desbloquear recursos avançados
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Basic Filters */}
        <div className="space-y-6">
          <h3 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider mb-4 border-b border-border pb-2">
            Segmentação
          </h3>
          
          {/* Language & Country */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  Idioma
                </Label>
                <InfoTooltip content="Filtre vídeos pelo idioma principal falado ou da descrição." />
              </div>
              <Select
                value={filters.language}
                onValueChange={(value) => updateFilter("language", value)}
              >
                <SelectTrigger className="pl-10 h-12 relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <SelectValue placeholder="Todos os idiomas" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value || "all"}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>País (Região)</Label>
                <InfoTooltip content="Restringe a busca para vídeos publicados em uma região específica." />
              </div>
              <Select
                value={filters.country}
                onValueChange={(value) => updateFilter("country", value)}
              >
                <SelectTrigger className="pl-10 h-12 relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <SelectValue placeholder="Todos os países" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value || "all"}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Period */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Período de Publicação</Label>
                {isPresetField("publishedAfter") && (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 rounded-full">
                    Auto
                  </span>
                )}
              </div>
              <InfoTooltip content="Busque vídeos recentes para encontrar tendências ou antigos para evergreens." />
            </div>

            {/* Quick Shortcuts */}
            <div className="flex flex-wrap gap-2 mb-3">
              {TIME_SHORTCUTS.slice(0, 4).map((shortcut) => (
                <Button
                  key={shortcut.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-full text-xs"
                  onClick={() => setDateShortcut(shortcut.days)}
                >
                  {shortcut.label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="date"
                  value={filters.publishedAfter || ""}
                  onChange={(e) => updateFilter("publishedAfter", e.target.value || null)}
                  className={cn("h-10 pl-9 text-sm", getInputClass("publishedAfter").replace("h-12", ""))}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="date"
                  value={filters.publishedBefore || ""}
                  onChange={(e) => updateFilter("publishedBefore", e.target.value || null)}
                  className="h-10 pl-9 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Performance Metrics */}
        <div className="space-y-6">
          <h3 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider mb-4 border-b border-border pb-2">
            Métricas de Performance
          </h3>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="minViews" className="text-sm">Views Mínimas</Label>
                  <InfoTooltip content="Mínimo de visualizações que o vídeo deve ter." />
                </div>
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="minViews"
                    type="number"
                    min={0}
                    value={filters.minViews}
                    onChange={(e) => updateFilter("minViews", parseInt(e.target.value) || 0)}
                    className={getInputClass("minViews")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="minLikes" className="text-sm">Likes Mínimos</Label>
                  <InfoTooltip content="Garanta qualidade filtrando vídeos com engajamento." />
                </div>
                <div className="relative">
                  <ThumbsUp className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="minLikes"
                    type="number"
                    min={0}
                    value={filters.minLikes}
                    onChange={(e) => updateFilter("minLikes", parseInt(e.target.value) || 0)}
                    className={getInputClass("minLikes")}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="minSubs" className="text-sm text-nowrap truncate">Inscritos Mín</Label>
                  <InfoTooltip content="Tamanho mínimo do canal." />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="minSubs"
                    type="number"
                    min={0}
                    value={filters.minSubscribers}
                    onChange={(e) => updateFilter("minSubscribers", parseInt(e.target.value) || 0)}
                    className={getInputClass("minSubscribers")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maxSubs" className="text-sm text-nowrap truncate">Inscritos Máx</Label>
                  <InfoTooltip content="Use isso para encontrar canais pequenos que estão viralizando (Outliers)." />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="maxSubs"
                    type="number"
                    min={0}
                    placeholder="∞"
                    value={filters.maxSubscribers || ""}
                    onChange={(e) =>
                      updateFilter("maxSubscribers", e.target.value ? parseInt(e.target.value) : null)
                    }
                    className={getInputClass("maxSubscribers")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-dashed border-border">
              <div className="flex items-center justify-between">
                <Label htmlFor="maxResults">Total de Resultados</Label>
                <InfoTooltip content="Quantos vídeos retornar (máx 100 por busca)." />
              </div>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="maxResults"
                  type="number"
                  min={1}
                  max={100}
                  value={filters.maxResults}
                  onChange={(e) => updateFilter("maxResults", parseInt(e.target.value) || 50)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
        <Button 
          type="submit" 
          size="lg"
          className="flex-1 text-base font-semibold shadow-lg shadow-primary/20"
          disabled={isLoading || !filters.keywords.trim()}
        >
          <Search className="mr-2 h-5 w-5" />
          {isLoading ? "Analisando YouTube..." : "Buscar Vídeos"}
        </Button>
        
        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={handleClear} className="w-full sm:w-auto">
            <X className="mr-2 h-5 w-5" />
            Limpar
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={onSave} className="w-full sm:w-auto">
            <Save className="mr-2 h-5 w-5" />
            Salvar
          </Button>
        </div>
      </div>
    </form>
  )
}
