import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe/server"
import { STRIPE_CONFIG } from "@/lib/stripe/config"

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json()
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!STRIPE_CONFIG.SECRET_KEY) {
       console.warn("Stripe keys missing")
       return NextResponse.json({ url: "/app" }) // Fallback for demo
    }

    // Create Checkout Session (Mock/Real)
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/configuracoes?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
      metadata: {
        userId: user.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
