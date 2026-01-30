import { SearchFilters } from "@/types"

export interface PresetFormValues {
  minViews?: number
  minLikes?: number
  minSubscribers?: number
  maxSubscribers?: number
  publishedAfterDays?: number
  maxResults?: number
}

export interface FilterPreset {
  id: string
  name: string
  icon: string
  description: string
  tooltip: string
  color: string
  formValues: PresetFormValues
}

export const SMART_PRESETS: FilterPreset[] = [
  {
    id: "rising-stars",
    name: "Estrelas em Ascensão",
    icon: "⭐",
    description: "Canais pequenos com vídeos que bombaram esta semana",
    tooltip: `Este filtro busca:
• Canais com menos de 10.000 inscritos
• Vídeos com pelo menos 50.000 views
• Publicados nos últimos 7 dias
• Com engajamento mínimo de 2.000 likes

Por que funciona: Canais pequenos com vídeos virais recentes têm alta probabilidade de crescimento explosivo.`,
    color: "from-yellow-500 to-orange-500",
    formValues: {
      maxSubscribers: 10000,
      minViews: 50000,
      publishedAfterDays: 7,
      minLikes: 2000,
      maxResults: 50,
    },
  },
  {
    id: "hidden-virals",
    name: "Virais Ocultos",
    icon: "🔥",
    description: "Vídeos com 5x mais views que o normal do canal",
    tooltip: `Este filtro busca:
• Canais com menos de 50.000 inscritos
• Vídeos com pelo menos 100.000 views
• Publicados nos últimos 30 dias
• Com engajamento mínimo de 3.000 likes

Por que funciona: View Ratio alto significa que o algoritmo favoreceu este vídeo especificamente.`,
    color: "from-orange-500 to-red-500",
    formValues: {
      maxSubscribers: 50000,
      minViews: 100000,
      publishedAfterDays: 30,
      minLikes: 3000,
      maxResults: 50,
    },
  },
  {
    id: "raw-diamonds",
    name: "Diamantes Brutos",
    icon: "💎",
    description: "Micro-canais com fãs super engajados",
    tooltip: `Este filtro busca:
• Canais com menos de 1.000 inscritos
• Vídeos com pelo menos 5.000 views
• Publicados nos últimos 14 dias
• Com engajamento mínimo de 400 likes

Por que funciona: Engajamento alto em canais pequenos indica comunidade fiel e conteúdo de qualidade.`,
    color: "from-cyan-500 to-blue-500",
    formValues: {
      maxSubscribers: 1000,
      minViews: 5000,
      publishedAfterDays: 14,
      minLikes: 400,
      maxResults: 50,
    },
  },
  {
    id: "high-momentum",
    name: "Momentum Alto",
    icon: "⚡",
    description: "Vídeos ganhando milhares de views por dia agora",
    tooltip: `Este filtro busca:
• Canais com menos de 100.000 inscritos
• Vídeos com pelo menos 30.000 views
• Publicados nos últimos 3 dias
• Com engajamento mínimo de 1.500 likes

Por que funciona: Vídeos recentes com alta tração estão em pleno crescimento.`,
    color: "from-purple-500 to-pink-500",
    formValues: {
      maxSubscribers: 100000,
      minViews: 30000,
      publishedAfterDays: 3,
      minLikes: 1500,
      maxResults: 50,
    },
  },
  {
    id: "monetization-ready",
    name: "Potencial de Monetização",
    icon: "🏆",
    description: "Canais prestes a começar a ganhar dinheiro",
    tooltip: `Este filtro busca:
• Canais entre 500 e 1.500 inscritos
• Vídeos com pelo menos 50.000 views
• Publicados nos últimos 30 dias
• Com engajamento mínimo de 2.000 likes

Por que funciona: Canais na "zona de aceleração" pré-monetização têm momento crítico de crescimento.`,
    color: "from-green-500 to-emerald-500",
    formValues: {
      minSubscribers: 500,
      maxSubscribers: 1500,
      minViews: 50000,
      publishedAfterDays: 30,
      minLikes: 2000,
      maxResults: 50,
    },
  },
]

/**
 * Get preset by ID
 */
export function getPresetById(id: string): FilterPreset | undefined {
  return SMART_PRESETS.find((preset) => preset.id === id)
}

/**
 * Convert publishedAfterDays to ISO date string
 */
export function daysAgoToDate(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().split("T")[0]
}

/**
 * Apply preset to create full SearchFilters
 */
export function applyPresetToFilters(
  preset: FilterPreset,
  keyword: string
): SearchFilters {
  return {
    keywords: keyword,
    language: "",
    country: "",
    publishedAfter: preset.formValues.publishedAfterDays
      ? daysAgoToDate(preset.formValues.publishedAfterDays)
      : "",
    publishedBefore: "",
    minViews: preset.formValues.minViews || 0,
    minLikes: preset.formValues.minLikes || 0,
    minSubscribers: preset.formValues.minSubscribers || 0,
    maxSubscribers: preset.formValues.maxSubscribers ?? null,
    maxResults: preset.formValues.maxResults || 50,
  }
}
