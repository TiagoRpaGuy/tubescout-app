"use client"

import {
  Eye,
  ThumbsUp,
  Users,
  Clock,
  ExternalLink,
  Star,
  TrendingUp,
  DollarSign,
  Info,
  BarChart3,
  Zap,
  Target,
} from "lucide-react"
import { SearchResult } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  estimateMonthlyEarnings,
  formatEarningsRange,
  getSocialBladeUrl,
  getConfidenceColor,
} from "@/lib/earnings"

interface VideoCardProps {
  result: SearchResult
  onFavorite?: (result: SearchResult) => void
  isFavorited?: boolean
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`
  }
  return num.toString()
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return duration

  const hours = match[1] ? parseInt(match[1]) : 0
  const minutes = match[2] ? parseInt(match[2]) : 0
  const seconds = match[3] ? parseInt(match[3]) : 0

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-500"
  if (score >= 40) return "text-yellow-500"
  return "text-orange-500"
}

function getScoreBg(score: number): string {
  if (score >= 70) return "bg-green-500/20"
  if (score >= 40) return "bg-yellow-500/20"
  return "bg-orange-500/20"
}

export function VideoCard({ result, onFavorite, isFavorited }: VideoCardProps) {
  const { video, channel, outlierScore, scoreComponents } = result

  // Calculate earnings estimate
  const earnings = estimateMonthlyEarnings(channel.viewCount, 365)
  const earningsDisplay = formatEarningsRange(earnings)
  const confidenceColor = getConfidenceColor(earnings.confidence)

  return (
    <TooltipProvider>
      {/* Card com hover cinza suave */}
      <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-[rgba(100,116,139,0.3)] hover:bg-[rgba(100,116,139,0.08)] hover:shadow-lg">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </div>
          {/* Outlier Score Badge */}
          <div
            className={`absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${getScoreBg(outlierScore)} ${getScoreColor(outlierScore)}`}
          >
            <TrendingUp className="h-3 w-3" />
            {outlierScore}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground">
            {video.title}
          </h3>

          {/* Channel Info */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-full bg-secondary">
              <img
                src={channel.thumbnailUrl}
                alt={channel.title}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground">{channel.title}</span>
          </div>

          {/* Metrics */}
          <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{formatNumber(video.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{formatNumber(video.likeCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{formatNumber(channel.subscriberCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>

          {/* Earnings Section */}
          <div className="mb-3 flex items-center justify-between rounded-md bg-secondary/50 px-2 py-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-1 cursor-help ${confidenceColor}`}>
                  <DollarSign className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{earningsDisplay}</span>
                  <span className="text-xs text-muted-foreground">/mês</span>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-xs">
                  <strong>Estimativa baseada em CPM médio</strong> ($0.25 - $4.00/1000 views).
                  <br /><br />
                  Valores reais podem variar conforme nicho, país e acordos comerciais.
                </p>
              </TooltipContent>
            </Tooltip>
            {/* Social Blade Link - COR DISCRETA */}
            <a
              href={getSocialBladeUrl(channel.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Target className="h-3 w-3" />
              SB
            </a>
          </div>

          {/* Score Components com labels */}
          <div className="mb-3 space-y-1 text-xs">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-between items-center cursor-help">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <BarChart3 className="h-3 w-3 text-blue-400" />
                    View Ratio
                    <Info className="h-2.5 w-2.5" />
                  </span>
                  <span className="font-medium text-blue-400">{scoreComponents.viewRatio.toFixed(1)}x</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p className="text-xs">
                  Proporção de views deste vídeo vs média do canal. Acima de 2x = potencial viral.
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-between items-center cursor-help">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Zap className="h-3 w-3 text-green-400" />
                    Engajamento
                    <Info className="h-2.5 w-2.5" />
                  </span>
                  <span className="font-medium text-green-400">{scoreComponents.engagementRate.toFixed(1)}%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p className="text-xs">
                  Porcentagem de views que viraram like. Acima de 4% = conteúdo de alta qualidade.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {/* BOTÃO RENOMEADO: "Ver Vídeo" */}
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, "_blank")}
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Ver Vídeo
            </Button>
            <Button
              variant={isFavorited ? "default" : "secondary"}
              size="sm"
              onClick={() => onFavorite?.(result)}
            >
              <Star className={`h-3 w-3 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
