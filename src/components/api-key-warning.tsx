"use client"

import Link from "next/link"
import { AlertTriangle, Settings } from "lucide-react"

interface ApiKeyWarningProps {
  hasApiKey?: boolean
}

export function ApiKeyWarning({ hasApiKey = false }: ApiKeyWarningProps) {
  if (hasApiKey) return null

  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-200 mb-1">
            Configure sua Chave da API do YouTube
          </h3>
          <p className="text-sm text-amber-100/80 mb-3">
            Para realizar buscas de vídeos, você precisa configurar sua própria chave da API do YouTube. 
            Isso garante que você tenha controle total sobre o uso e os custos da API.
          </p>
          <Link 
            href="/settings" 
            className="inline-flex items-center gap-2 text-sm text-amber-200 hover:text-amber-100 transition-colors font-medium"
          >
            <Settings className="h-4 w-4" />
            Ir para Configurações
          </Link>
        </div>
      </div>
    </div>
  )
}
