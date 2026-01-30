import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// POST - Record a search in history
export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    // For anonymous users, just return success without saving
    return NextResponse.json({ success: true, saved: false })
  }

  const body = await request.json()
  
  const { error } = await supabase
    .from("search_history")
    .insert({
      user_id: user.id,
      keyword: body.keyword,
      filters: body.filters,
      results_count: body.resultsCount || 0,
    })

  if (error) {
    console.error("Failed to save search history:", error)
    // Don't fail the request, just log the error
    return NextResponse.json({ success: true, saved: false })
  }

  return NextResponse.json({ success: true, saved: true })
}

// GET - Get user's search history
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("search_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
