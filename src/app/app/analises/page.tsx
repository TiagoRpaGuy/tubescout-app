"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { BarChart2, Search, TrendingUp, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchHistoryItem {
  id: string
  keyword: string
  filters: Record<string, unknown>
  results_count: number
  created_at: string
}

export default function AnalisesPage() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)

  const loadData = async () => {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user ? { email: user.email || "" } : null)

    if (user) {
      const response = await fetch("/api/search-history")
      if (response.ok) {
        const data = await response.json()
        setHistory(data.data || [])
      }
    }
    
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Group searches by keyword
  const keywordStats = history.reduce((acc, item) => {
    if (!acc[item.keyword]) {
      acc[item.keyword] = { count: 0, totalResults: 0 }
    }
    acc[item.keyword].count++
    acc[item.keyword].totalResults += item.results_count
    return acc
  }, {} as Record<string, { count: number; totalResults: number }>)

  const topKeywords = Object.entries(keywordStats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BarChart2 className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Análises</h1>
        <p className="text-muted-foreground mb-4">
          Faça login para acessar suas análises e histórico de buscas.
        </p>
        <Button asChild>
          <a href="/login">Entrar</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart2 className="h-7 w-7 text-primary" />
            Análises
          </h1>
          <p className="text-muted-foreground">
            Insights sobre suas buscas e canais analisados
          </p>
        </div>
        <Button variant="outline" disabled>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Search className="h-4 w-4" />
            <span className="text-sm">Total de Buscas</span>
          </div>
          <p className="text-3xl font-bold">{history.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Keywords Únicas</span>
          </div>
          <p className="text-3xl font-bold">{Object.keys(keywordStats).length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart2 className="h-4 w-4" />
            <span className="text-sm">Vídeos Encontrados</span>
          </div>
          <p className="text-3xl font-bold">
            {history.reduce((acc, h) => acc + h.results_count, 0)}
          </p>
        </div>
      </div>

      {/* Top Keywords */}
      {topKeywords.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Top Keywords Pesquisadas
          </h2>
          <div className="space-y-2">
            {topKeywords.map(([keyword, stats], index) => (
              <div
                key={keyword}
                className="flex items-center justify-between rounded-md p-2 hover:bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    #{index + 1}
                  </span>
                  <span className="font-medium">{keyword}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{stats.count} buscas</span>
                  <span>{stats.totalResults} resultados</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Histórico de Buscas Recentes
        </h2>
        {history.length > 0 ? (
          <div className="space-y-2">
            {history.slice(0, 20).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md p-2 hover:bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.keyword}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{item.results_count} resultados</span>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma busca registrada ainda. Faça sua primeira busca!
          </p>
        )}
      </div>
    </div>
  )
}
