"use client"

import { Info, AlertCircle } from "lucide-react"
import { FilterPreset, SMART_PRESETS } from "@/lib/presets"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface PresetChipsProps {
  selectedPreset: string | null
  onSelectPreset: (preset: FilterPreset) => void
  onClearPreset: () => void
  disabled?: boolean
  keywordMissing?: boolean
}

export function PresetChips({
  selectedPreset,
  onSelectPreset,
  onClearPreset,
  disabled,
  keywordMissing,
}: PresetChipsProps) {
  const handleClick = (preset: FilterPreset) => {
    if (disabled || keywordMissing) return
    onSelectPreset(preset)
  }

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">⚡ Filtros Rápidos</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs">
                Clique em um filtro para <strong>preencher automaticamente</strong> os campos abaixo.
                <br /><br />
                Você pode revisar e editar os valores antes de buscar.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Keyword Missing Warning */}
        {keywordMissing && (
          <div className="flex items-center gap-2 text-xs text-amber-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Digite uma palavra-chave primeiro para usar os filtros rápidos</span>
          </div>
        )}

        {/* Preset Chips */}
        <div className="flex flex-wrap gap-2">
          {SMART_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id
            const isDisabled = disabled || keywordMissing

            return (
              <Tooltip key={preset.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => handleClick(preset)}
                    disabled={isDisabled}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      "border",
                      isSelected
                        ? `bg-gradient-to-r ${preset.color} text-white border-transparent shadow-md`
                        : isDisabled
                          ? "bg-secondary/30 text-muted-foreground/50 border-border/50 cursor-not-allowed"
                          : "bg-secondary/50 text-muted-foreground border-border hover:bg-secondary hover:text-foreground hover:border-primary/30"
                    )}
                  >
                    <span className="text-sm">{preset.icon}</span>
                    <span>{preset.name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm" align="start">
                  <p className="text-xs font-semibold mb-2">{preset.description}</p>
                  <p className="text-xs text-muted-foreground whitespace-pre-line">{preset.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {/* Active Preset Badge */}
        {selectedPreset && (
          <div className="flex items-center gap-3 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {SMART_PRESETS.find((p) => p.id === selectedPreset)?.icon}
                </span>
                <span className="text-sm font-medium text-primary">
                  {SMART_PRESETS.find((p) => p.id === selectedPreset)?.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Campos preenchidos automaticamente • Você pode editar os valores abaixo
              </p>
            </div>
            <button
              type="button"
              onClick={onClearPreset}
              className="text-xs text-primary hover:underline"
            >
              ✕ Limpar
            </button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
