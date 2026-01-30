"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  buttonText?: string
  limitations?: string[]
}

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular,
  buttonText = "Assinar Agora",
  limitations,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md flex flex-col h-full",
        isPopular ? "border-primary/50 ring-1 ring-primary/50 shadow-primary/10" : "border-border"
      )}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          Mais Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Grátis" && <span className="text-sm text-muted-foreground">/mês</span>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mb-6 flex-1 space-y-4">
        <div className="space-y-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {limitations && limitations.length > 0 && (
          <div className="pt-4 border-t border-border/50">
             <p className="text-xs font-semibold text-muted-foreground mb-2">Limitações:</p>
             {limitations.map((limit) => (
                <div key={limit} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                  <span>{limit}</span>
                </div>
             ))}
          </div>
        )}
      </div>

      <Button
        className={cn(
          "w-full",
          isPopular ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-0" : ""
        )}
        variant={isPopular ? "default" : "outline"}
        onClick={() => {
            // Placeholder for Stripe
            alert(`Plano ${name} selecionado. Integração Stripe em breve.`)
        }}
      >
        {buttonText}
      </Button>
    </div>
  )
}
