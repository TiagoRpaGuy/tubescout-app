"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Settings, User, Moon, Globe, Trash2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserProfile {
  email: string
  name: string
  avatar_url: string
}

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("pt-BR")

  const loadProfile = async () => {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      setProfile({
        email: user.email || "",
        name: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
        avatar_url: user.user_metadata?.avatar_url || "",
      })
    }
    
    setIsLoading(false)
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  const handleDeleteAccount = async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      return
    }
    // TODO: Implement account deletion
    alert("Funcionalidade em desenvolvimento.")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Settings className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground mb-4">
          Faça login para acessar suas configurações.
        </p>
        <Button asChild>
          <a href="/login">Entrar</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-7 w-7 text-primary" />
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Gerencie sua conta e preferências
        </p>
      </div>

      {/* Profile Section */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Perfil
        </h2>
        
        <div className="flex items-center gap-4 mb-4">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
              {profile.name[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-lg">{profile.name}</p>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Conectado via Google. Para alterar seu perfil, acesse sua conta Google.
        </p>
      </div>

      {/* Preferences Section */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Moon className="h-4 w-4 text-primary" />
          Preferências
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Tema</Label>
              <p className="text-sm text-muted-foreground">
                Escolha o tema da interface
              </p>
            </div>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Idioma Padrão</Label>
              <p className="text-sm text-muted-foreground">
                Idioma para filtros de busca
              </p>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (BR)</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Plan Section */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          Plano Atual
        </h2>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium text-lg">Free</p>
            <p className="text-sm text-muted-foreground">
              Acesso básico ao VidRadar
            </p>
          </div>
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-500">
            Ativo
          </span>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          <p>• 50 buscas por dia</p>
          <p>• 100 favoritos</p>
          <p>• Histórico de 30 dias</p>
        </div>

        <Button variant="outline" disabled>
          Upgrade para Pro (em breve)
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-destructive/50 bg-card p-6">
        <h2 className="font-semibold mb-4 text-destructive">Zona de Perigo</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sair da conta</p>
              <p className="text-sm text-muted-foreground">
                Encerrar sessão neste dispositivo
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Excluir conta</p>
              <p className="text-sm text-muted-foreground">
                Remover permanentemente todos os seus dados
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
