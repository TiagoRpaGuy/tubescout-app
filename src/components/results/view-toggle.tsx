"use client"

import { LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"

export type ViewMode = "list" | "grid"

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-1">
      <button
        onClick={() => onChange("list")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
          mode === "list"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        title="Visualização em Lista"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">Lista</span>
      </button>
      <button
        onClick={() => onChange("grid")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
          mode === "grid"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        title="Visualização em Grade"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Grade</span>
      </button>
    </div>
  )
}
