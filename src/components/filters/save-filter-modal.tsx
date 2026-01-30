"use client"

import { useState } from "react"
import { X, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchFilters } from "@/types"

interface SaveFilterModalProps {
  filters: SearchFilters
  onClose: () => void
  presetId?: string
}

export function SaveFilterModal({
  filters,
  onClose,
  presetId,
}: SaveFilterModalProps) {
  const [name, setName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!name.trim()) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      const response = await fetch("/api/filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          keyword: filters.keywords,
          filters: {
            minViews: filters.minViews,
            minLikes: filters.minLikes,
            minSubscribers: filters.minSubscribers,
            maxSubscribers: filters.maxSubscribers ?? null,
            publishedAfterDays: filters.publishedAfter ? 
              Math.ceil((Date.now() - new Date(filters.publishedAfter).getTime()) / (1000 * 60 * 60 * 24)) : null,
            maxResults: filters.maxResults,
          },
          presetId: presetId || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao salvar filtro")
      }

      // Success - close modal
      setName("")
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setIsSaving(false)
    }
  }

  const filterSummary = [
    filters.keywords && `Palavra-chave: "${filters.keywords}"`,
    filters.minViews > 0 && `Views mín: ${filters.minViews.toLocaleString()}`,
    filters.minLikes > 0 && `Likes mín: ${filters.minLikes.toLocaleString()}`,
    filters.minSubscribers > 0 && `Inscritos mín: ${filters.minSubscribers.toLocaleString()}`,
    filters.maxSubscribers && `Inscritos máx: ${filters.maxSubscribers.toLocaleString()}`,
    filters.publishedAfter && `A partir de: ${filters.publishedAfter}`,
    filters.language && `Idioma: ${filters.language}`,
  ].filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Save className="h-5 w-5 text-primary" />
            </div>
            Salvar Filtros
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="filter-name">Nome do filtro</Label>
            <Input
              id="filter-name"
              placeholder="Ex: Deep House - Canais Pequenos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Filter Summary */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Filtros configurados:</Label>
            <div className="rounded-xl bg-secondary/50 p-4 space-y-2">
              {filterSummary.length > 0 ? (
                filterSummary.map((item, i) => (
                  <div key={i} className="text-sm flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum filtro configurado
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Filtro
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
