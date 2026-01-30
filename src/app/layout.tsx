import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MouseSpotlight } from "@/components/ui/mouse-spotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TubeScout - Inteligência de Dados para YouTube",
  description:
    "Monitore milhões de canais pequenos para descobrir tendências ocultas. A ferramenta definitiva de inteligência estratégica para o YouTube.",
  keywords: ["YouTube", "outliers", "vídeos virais", "análise de canais", "crescimento", "intelligence"],
  authors: [{ name: "TubeScout" }],
  openGraph: {
    title: "TubeScout - Inteligência de Dados para YouTube",
    description: "Monitore milhões de canais pequenos para descobrir tendências ocultas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <MouseSpotlight />
        {children}
      </body>
    </html>
  );
}
