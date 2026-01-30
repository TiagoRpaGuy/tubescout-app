import { NextRequest, NextResponse } from "next/server"
import { YouTubeClient } from "@/lib/youtube/client"
import { SearchFilters } from "@/types"
import { createClient } from "@/lib/supabase/server"

// Lista de emails autorizados a usar a API Key do sistema
const SYSTEM_API_USERS = [
  "tiagotureck01@gmail.com",
  "teste@gmail.com"
]

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  console.log("[API] Search request received")
  
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !user.email) {
      console.log("[API] Unauthorized: No user or email")
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userEmail = user.email.toLowerCase().trim()
    console.log(`[API] User: ${userEmail}`)
    
    const isSystemUser = SYSTEM_API_USERS.includes(userEmail)
    console.log(`[API] Is user system/admin? ${isSystemUser}`)
    
    // Verificação de limite de uso para usuários não-sistema (3 usos gratuitos)
    if (!isSystemUser) {
      console.log("[API] Checking usage limit for trial user...")
      // Contar quantas buscas o usuário já fez
      const { count, error } = await supabase
        .from("search_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)

      if (error) {
        console.error("[API] Error checking usage limit (Table missing?):", error)
        return NextResponse.json(
          { success: false, error: "Erro interno ao verificar limite (Tabela search_history existe?)." },
          { status: 500 }
        )
      }

      const usageCount = count || 0
      console.log(`[API] Usage count: ${usageCount}`)
      
      if (usageCount >= 3) {
        console.log("[API] Limit exceeded")
        return NextResponse.json(
          { 
            success: false, 
            error: "Limite gratuito excedido (3 buscas). Configure sua própria API Key nas configurações." 
          },
          { status: 403 }
        )
      }
    }

    // Determinar qual API Key usar.
    // Correção: usando const para evitar aviso do linter (API Key não é reatribuída)
    const apiKey = process.env.YOUTUBE_API_KEY
    console.log(`[API] Using System API Key? ${!!apiKey}`)
    
    if (!apiKey) {
      console.error("[API] System API key missing in env")
      return NextResponse.json(
        { success: false, error: "System API key not configured" },
        { status: 500 }
      )
    }

    const filters: SearchFilters = await request.json()

    if (!filters.keywords || filters.keywords.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Keywords are required" },
        { status: 400 }
      )
    }

    console.log(`[API] Searching YouTube for: ${filters.keywords}`)
    const client = new YouTubeClient(apiKey)
    const results = await client.search(filters)
    console.log(`[API] Search success. Results: ${results.length}`)

    // Salvar histórico de busca
    try {
      const { error: insertError } = await supabase.from("search_history").insert({
        user_id: user.id,
        keyword: filters.keywords,
        filters: filters,
        results_count: results.length
      })
      if (insertError) console.error("[API] Failed to save history:", insertError)
    } catch (histErr) {
      console.error("[API] Exception saving history:", histErr)
    }

    // Correção: Retornando 'results' ao invés de 'data' para compatibilidade com o frontend
    return NextResponse.json({
      success: true,
      results: results, 
      count: results.length,
      userType: isSystemUser ? "system" : "trial"
    })

  } catch (error) {
    console.error("[API] YouTube search exception:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    )
  }
}
