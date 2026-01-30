"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Play } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const supabase = createClient()

    try {
      if (activeTab === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push("/app")
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setError("Verifique seu email para confirmar o cadastro")
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao fazer login"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-[500px] w-[500px] bg-primary/15 blur-[120px] rounded-full" />
      </div>

      {/* Brand Header */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="bg-primary p-3 rounded-xl shadow-lg shadow-primary/20 mb-4 transform hover:scale-105 transition-transform duration-500">
           <Play className="h-8 w-8 text-white fill-white ml-1" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">TubeScout</h1>
        <p className="text-zinc-400 text-sm">Encontre vídeos outliers no YouTube</p>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] bg-[#222228] border border-zinc-800 rounded-2xl shadow-2xl p-6">
        {/* Tabs */}
        <div className="grid grid-cols-2 bg-zinc-900/50 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={cn(
              "py-2 text-sm font-medium rounded-md transition-all duration-300",
              activeTab === "login" 
                ? "bg-[#1A1A1A] text-white shadow-sm ring-1 ring-white/5" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Entrar
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={cn(
              "py-2 text-sm font-medium rounded-md transition-all duration-300",
              activeTab === "register" 
                ? "bg-[#1A1A1A] text-white shadow-sm ring-1 ring-white/5" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Cadastrar
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 ml-1">Email</label>
            <Input 
              type="email" 
              placeholder="seu@email.com" 
              className="bg-zinc-900/50 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 h-10 focus-visible:ring-primary/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
             <div className="flex justify-between items-center ml-1">
               <label className="text-xs font-medium text-zinc-400">Senha</label>
               {activeTab === "login" && (
                 <a href="#" className="text-[10px] text-zinc-500 hover:text-primary transition-colors">Esqueci minha senha</a>
               )}
             </div>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-zinc-900/50 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 h-10 focus-visible:ring-primary/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button 
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold tracking-wide shadow-lg shadow-primary/25 border-0 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              activeTab === "login" ? "Entrar" : "Criar Conta"
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#222228] px-2 text-zinc-500">Ou continue com</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full h-11 border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
            )}
            Continuar com Google
          </Button>

        </form>
      </div>
    </div>
  )
}
