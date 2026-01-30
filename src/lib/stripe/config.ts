export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
  PLANS: {
    STARTER: {
      name: "Starter",
      id: "price_starter_placeholder", // Replace with real Price ID
      price: 2990,
    },
    CREATOR: {
      name: "Creator",
      id: "price_creator_placeholder",
      price: 5990,
    },
    PRO: {
      name: "Pro",
      id: "price_pro_placeholder",
      price: 9990,
    },
    AGENCY: {
      name: "Agency",
      id: "price_agency_placeholder",
      price: 24990,
    },
  },
} as const
