"use client"

import {
  Eye,
  ThumbsUp,
  Users,
  Clock,
  ExternalLink,
  Star,
  TrendingUp,
  Play,
  MessageCircle,
  BarChart3,
  DollarSign,
  Info,
  LineChart,
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
  formatViewsCompact,
} from "@/lib/earnings"

interface VideoListItemProps {
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

function getTimeSince(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Hoje"
  if (diffDays === 1) return "Ontem"
  if (diffDays < 7) return `${diffDays} dias atrás`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} sem. atrás`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`
  return `${Math.floor(diffDays / 365)} anos atrás`
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-400"
  if (score >= 40) return "text-yellow-400"
  return "text-orange-400"
}

function getScoreBg(score: number): string {
  if (score >= 70) return "bg-green-500/20 border-green-500/30"
  if (score >= 40) return "bg-yellow-500/20 border-yellow-500/30"
  return "bg-orange-500/20 border-orange-500/30"
}

function getChannelAgeDays(): number {
  return 365 // Default to 1 year if unknown
}

export function VideoListItem({ result, onFavorite, isFavorited }: VideoListItemProps) {
  const { video, channel, outlierScore, scoreComponents } = result

  // Calculate earnings estimate
  const channelAge = getChannelAgeDays()
  const earnings = estimateMonthlyEarnings(channel.viewCount, channelAge)
  const earningsDisplay = formatEarningsRange(earnings)
  const confidenceColor = getConfidenceColor(earnings.confidence)

  return (
    <TooltipProvider>
      {/* Card com hover cinza suave */}
      <div className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-[rgba(100,116,139,0.3)] hover:bg-[rgba(100,116,139,0.08)]">
        {/* Thumbnail Section */}
        <div className="relative flex-shrink-0">
          <div className="relative h-24 w-40 overflow-hidden rounded-md sm:h-28 sm:w-48">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
              <Play className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
              {formatDuration(video.duration)}
            </div>
          </div>
          
          {/* Outlier Score Badge with Label */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`absolute -left-2 -top-2 flex flex-col items-center rounded-lg border px-2 py-1 shadow-lg cursor-help ${getScoreBg(outlierScore)}`}
              >
                <span className="text-[8px] uppercase tracking-wide text-muted-foreground">Score</span>
                <div className={`flex items-center gap-0.5 font-bold text-sm ${getScoreColor(outlierScore)}`}>
                  <TrendingUp className="h-3 w-3" />
                  <span>{outlierScore}</span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs font-semibold mb-1">Outlier Score: {outlierScore}/100</p>
              <p className="text-xs text-muted-foreground">
                Este vídeo performa {outlierScore}% melhor que a média do canal.
                <br /><br />
                <strong>Composição:</strong><br />
                • View Ratio: {scoreComponents.viewRatio.toFixed(1)}x<br />
                • Engajamento: {scoreComponents.engagementRate.toFixed(1)}%
                <br /><br />
                {outlierScore >= 70 ? "⬆️ Alto potencial viral" : outlierScore >= 40 ? "➡️ Potencial moderado" : "⬇️ Performance abaixo da média"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          {/* Top: Title and Channel */}
          <div>
            <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
              {video.title}
            </h3>
            
            {/* Channel Info */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full bg-secondary">
                <img
                  src={channel.thumbnailUrl}
                  alt={channel.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="truncate text-xs text-muted-foreground sm:text-sm">
                {channel.title}
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline">•</span>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                <Users className="h-3 w-3" />
                {formatNumber(channel.subscriberCount)} inscritos
              </span>
            </div>
          </div>

          {/* Bottom: Metrics Row */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {/* Views */}
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{formatNumber(video.viewCount)}</span>
              <span className="hidden sm:inline">views</span>
            </div>
            
            {/* Likes */}
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{formatNumber(video.likeCount)}</span>
            </div>
            
            {/* Comments */}
            <div className="hidden items-center gap-1 sm:flex">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{formatNumber(video.commentCount)}</span>
            </div>
            
            {/* Published Date */}
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{getTimeSince(video.publishedAt)}</span>
            </div>

            {/* Score Components - COM LABELS E TOOLTIPS */}
            <div className="hidden items-center gap-3 border-l border-border pl-3 lg:flex">
              {/* View Ratio com label e tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 cursor-help" title="View Ratio">
                    <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-muted-foreground text-[10px]">View Ratio</span>
                    <span className="text-blue-400 font-medium">{scoreComponents.viewRatio.toFixed(1)}x</span>
                    <Info className="h-2.5 w-2.5 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs">
                    <strong>View Ratio:</strong> Proporção de views deste vídeo comparado à média do canal.
                    <br />
                    Valores acima de 2x indicam potencial viral.
                  </p>
                </TooltipContent>
              </Tooltip>

              {/* Engagement Rate com label e tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 cursor-help" title="Engagement Rate">
                    <Zap className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-muted-foreground text-[10px]">Engajamento</span>
                    <span className="text-green-400 font-medium">{scoreComponents.engagementRate.toFixed(1)}%</span>
                    <Info className="h-2.5 w-2.5 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs">
                    <strong>Engajamento:</strong> Porcentagem de visualizações que resultaram em like.
                    <br />
                    Valores acima de 4% indicam conteúdo de alta qualidade.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Earnings Row */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/50 pt-2 text-xs">
            {/* Monthly Earnings Estimate */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-1.5 cursor-help ${confidenceColor}`}>
                  <DollarSign className="h-3.5 w-3.5" />
                  <span className="font-semibold">{earningsDisplay}</span>
                  <span className="text-muted-foreground">/mês</span>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-xs">
                  <strong>Estimativa baseada em CPM médio</strong> ($0.25 - $4.00/1000 views).
                  <br /><br />
                  Valores reais podem variar significativamente conforme nicho, país e acordos comerciais.
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Monthly Views Estimate */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <LineChart className="h-3.5 w-3.5" />
              <span>~{formatViewsCompact(earnings.monthlyViews)} views/mês</span>
            </div>

            {/* Social Blade Link - COR DISCRETA */}
            <a
              href={getSocialBladeUrl(channel.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Target className="h-3 w-3" />
              <span>Social Blade</span>
            </a>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-shrink-0 flex-col items-end justify-between">
          {/* Publication date (exact) */}
          <span className="hidden text-xs text-muted-foreground xl:block">
            {formatDate(video.publishedAt)}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* BOTÃO RENOMEADO: "Ver Vídeo" */}
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, "_blank")}
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              <span className="hidden sm:inline">Ver Vídeo</span>
            </Button>
            <Button
              variant={isFavorited ? "default" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onFavorite?.(result)}
              title={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Star className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
