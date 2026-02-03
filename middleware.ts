import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Se usuário estiver logado e acessar /login, redireciona para /app
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/app", request.url))
  }

  // Se usuário NÃO estiver logado e acessar /app, redireciona para /login
  if (!user && request.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verificar se está acessando /admin e se é admin
  if (user && request.nextUrl.pathname.startsWith("/admin")) {
    const { data: userSettings } = await supabase
      .from("user_settings")
      .select("role")
      .eq("user_id", user.id)
      .single()

    if (userSettings?.role !== "admin") {
      return NextResponse.redirect(new URL("/app", request.url))
    }
  }

  // REMOVED: Redirect from "/" - allow landing page to be accessible

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes - let them handle auth themselves or be public)
     * - auth (auth callback routes)
     * - logo.png (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|api|auth|logo.png).*)",
  ],
}
