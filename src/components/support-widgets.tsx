"use client"

import { MessageCircle, Sparkles } from "lucide-react"
import { useState } from "react"

export function SupportWidgets() {
  const [showAiChat, setShowAiChat] = useState(false)

  const handleWhatsAppClick = () => {
    // Substitua pelo número real do WhatsApp
    const phoneNumber = "5511999999999" // Formato: código do país + DDD + número
    const message = encodeURIComponent("Olá! Preciso de suporte com o TubeScout.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* WhatsApp Support */}
        <button
          onClick={handleWhatsAppClick}
          className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] 
                     flex items-center justify-center shadow-lg transition-all
                     hover:scale-110 group"
          aria-label="Suporte WhatsApp"
          title="Falar com Suporte"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
        
        {/* AI Chat Assistant */}
        <button
          onClick={() => setShowAiChat(true)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 
                     flex items-center justify-center shadow-lg transition-all
                     hover:scale-110 group"
          aria-label="Assistente de IA"
          title="Ideias para Canal de Música"
        >
          <Sparkles className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* AI Chat Modal - Placeholder for now */}
      {showAiChat && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAiChat(false)}
        >
          <div 
            className="bg-[#222228] border border-zinc-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Assistente de IA</h2>
                  <p className="text-sm text-zinc-400">Ideias para Canal de Música</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiChat(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-[#1a1a1f] rounded-lg p-4 mb-4">
              <p className="text-zinc-300 text-sm">
                👋 Olá! Sou seu assistente de IA especializado em canais de música no YouTube.
              </p>
              <p className="text-zinc-400 text-sm mt-2">
                Posso ajudar você a:
              </p>
              <ul className="list-disc list-inside text-zinc-400 text-sm mt-2 space-y-1">
                <li>Desenvolver ideias de conteúdo musical</li>
                <li>Analisar tendências de nichos musicais</li>
                <li>Sugerir estratégias de crescimento</li>
                <li>Otimizar títulos e thumbnails</li>
              </ul>
            </div>

            <div className="text-center text-sm text-zinc-500">
              <p>🚧 Funcionalidade em desenvolvimento</p>
              <p className="mt-1">Em breve você poderá conversar com a IA aqui!</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
