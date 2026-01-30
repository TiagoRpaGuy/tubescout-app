import Stripe from "stripe"
import { STRIPE_CONFIG } from "./config"

// Singleton Pattern for Stripe Client
export const stripe = new Stripe(STRIPE_CONFIG.SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-01-27.acacia", // Use latest API version
  typescript: true,
})
