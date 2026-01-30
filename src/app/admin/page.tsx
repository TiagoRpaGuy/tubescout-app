import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Search, DollarSign, Activity } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Verify Admin (Double Check)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: userSettings } = await supabase
    .from("user_settings")
    .select("role")
    .eq("user_id", user.id)
    .single()

  if (userSettings?.role !== "admin") {
      redirect("/app")
  }

  // Fetch Stats (Mocked or Real)
  // For MVP, we'll try to fetch count of users if possible, or mock
  // Supabase count require HEAD or count='exact'
  const { count: usersCount } = await supabase.from('user_settings').select('*', { count: 'exact', head: true })
  
  // Search history count
  const { count: searchesCount } = await supabase.from('search_history').select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              +20% mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buscas Totais</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{searchesCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              +15% mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Estimada</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0,00</div>
            <p className="text-xs text-muted-foreground">
              0 Assinantes ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Users Table placeholder */}
      <div className="rounded-md border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Atividade Recente (Logs)</h3>
        <div className="h-32 flex items-center justify-center text-muted-foreground border border-dashed border-border rounded">
            Nenhum log disponível.
        </div>
      </div>
    </div>
  )
}
