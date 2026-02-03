"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Star, Trash2, ExternalLink, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Favorite {
  id: string
  video_id: string
  channel_id: string
  video_title: string
  channel_title: string
  thumbnail_url: string
  outlier_score: number
  view_ratio: number
  engagement_rate: number
  notes: string | null
  created_at: string
}

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)

  const loadData = async () => {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user ? { email: user.email || "" } : null)

    if (user) {
      const response = await fetch("/api/favorites")
      if (response.ok) {
        const data = await response.json()
        setFavorites(data.data || [])
      }
    }
    
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (videoId: string) => {
    const response = await fetch(`/api/favorites?videoId=${videoId}`, {
      method: "DELETE",
    })
    
    if (response.ok) {
      setFavorites(favorites.filter((f) => f.video_id !== videoId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

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
        <Star className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Favoritos</h1>
        <p className="text-muted-foreground mb-4">
          Faça login para acessar seus vídeos favoritos.
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
            <Star className="h-7 w-7 text-yellow-500" />
            Favoritos
          </h1>
          <p className="text-muted-foreground">
            {favorites.length} vídeo{favorites.length !== 1 ? "s" : ""} salvo{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="rounded-lg border border-border bg-card overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={favorite.thumbnail_url}
                  alt={favorite.video_title}
                  className="w-full h-full object-cover"
                />
                {/* Score Badge */}
                <div className="absolute top-2 left-2 rounded-full bg-black/80 px-2 py-1 text-xs font-bold text-green-400">
                  Score {favorite.outlier_score}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium line-clamp-2 mb-1">
                  {favorite.video_title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {favorite.channel_title}
                </p>
                
                {/* Metrics */}
                <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                  <span>View Ratio: {favorite.view_ratio?.toFixed(1)}x</span>
                  <span>Eng: {favorite.engagement_rate?.toFixed(1)}%</span>
                </div>

                <div className="text-xs text-muted-foreground mb-3">
                  Salvo em {formatDate(favorite.created_at)}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        `https://youtube.com/watch?v=${favorite.video_id}`,
                        "_blank"
                      )
                    }
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Ver Vídeo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(favorite.video_id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
          <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhum favorito ainda</h3>
          <p className="text-muted-foreground mb-4">
            Faça uma busca e clique na estrela para salvar vídeos aqui.
          </p>
          <Button asChild>
            <a href="/app">Ir para Busca</a>
          </Button>
        </div>
      )}
    </div>
  )
}
