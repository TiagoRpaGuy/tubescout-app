"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, X } from "lucide-react"

interface UsageBannerProps {
  searchesLeft?: number
  aiAnalysesLeft?: number
  isPro?: boolean
}

export function UsageBanner({ 
  searchesLeft = 1, 
  aiAnalysesLeft = 1, 
  isPro = false 
}: UsageBannerProps) {
  const [showProModal, setShowProModal] = useState(false)

  if (isPro) return null

  return (
    <>
      <div className="bg-[#222228] border border-zinc-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-zinc-300 mb-2">
              <strong className="text-white">{searchesLeft}</strong> {searchesLeft === 1 ? 'busca restante' : 'buscas restantes'} hoje | 
              <strong className="text-white ml-2">{aiAnalysesLeft}</strong> {aiAnalysesLeft === 1 ? 'análise' : 'análises'} de IA {aiAnalysesLeft === 1 ? 'restante' : 'restantes'}
            </p>
            <button 
              onClick={() => setShowProModal(true)}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer"
            >
              Torne-se PRO para acesso ilimitado →
            </button>
          </div>
        </div>
      </div>

      {/* Modal PRO - Em Desenvolvimento */}
      {showProModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">🚀 Plano PRO</h2>
              <button 
                onClick={() => setShowProModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold mb-2">Em Desenvolvimento</h3>
              <p className="text-muted-foreground">
                Esta funcionalidade está sendo desenvolvida e estará disponível em breve!
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-4">
              <p className="text-sm text-center">
                <span className="text-primary font-semibold">Em breve:</span> Buscas ilimitadas, análises de IA avançadas e muito mais!
              </p>
            </div>

            <button 
              onClick={() => setShowProModal(false)}
              className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  )
}
