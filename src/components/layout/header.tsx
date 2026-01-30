"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, BarChart2, TrendingUp, Star, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserMenu } from "@/components/auth/user-menu"

const navItems = [
  { href: "/app", label: "Buscar", icon: Search },
  { href: "/app/analises", label: "Análises", icon: BarChart2 },
  { href: "/app/outliers", label: "Outliers", icon: TrendingUp },
  { href: "/app/favoritos", label: "Favoritos", icon: Star },
  { href: "/app/configuracoes", label: "Configurações", icon: Settings },
]

export function Header() {
  const pathname = usePathname()

  // Don't show header on login page
  if (pathname === "/login") {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        {/* Logo - TubeScout */}
        <Link href="/app" className="mr-8 flex items-center space-x-3">
          <Image 
            src="/logo.png" 
            alt="TubeScout Logo" 
            width={36} 
            height={36}
            className="rounded-lg"
          />
          <span className="font-bold text-xl text-foreground tracking-tight">TubeScout</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2.5 text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden md:inline-block">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Side - User Menu */}
        <div className="ml-auto flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
