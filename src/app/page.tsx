"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Play, Search, TrendingUp, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#1a1a1f]/90 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Play className="h-4 w-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">TubeScout</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Entrar
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white border-0 rounded-lg px-5">
              <Link href="/login">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8">
            <Zap className="h-4 w-4" />
            Encontre vídeos outliers no YouTube
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-6 leading-tight">
            Descubra Vídeos que Estão{" "}
            <span className="text-primary">Viralizando</span>
            <br />
            Antes da Concorrência
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-2xl text-lg text-zinc-400 mb-10 leading-relaxed">
            O TubeScout analisa milhares de canais pequenos para encontrar vídeos que estão 
            performando <strong className="text-white">muito acima da média</strong>. 
            Perfeito para criadores de conteúdo que querem modelar o sucesso.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button asChild size="lg" className="h-14 px-8 rounded-lg text-lg bg-primary hover:bg-primary/90 border-0 shadow-lg shadow-primary/25">
              <Link href="/login">
                Começar a Minerar Ideias
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-lg text-lg border-zinc-700 bg-transparent hover:bg-zinc-800 text-white">
              <Link href="#como-funciona">Ver Como Funciona</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>+5.000 criadores ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>+1M de vídeos analisados</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Atualizado em tempo real</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24 bg-[#15151a]">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Como Funciona?</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Três passos simples para encontrar oportunidades de conteúdo que você nunca veria de outra forma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-8 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <div className="absolute -top-4 left-8 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                1
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Busque por Nicho</h3>
              <p className="text-zinc-400">
                Digite palavras-chave do seu nicho e aplique filtros avançados como idioma, país e tamanho do canal.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <div className="absolute -top-4 left-8 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                2
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Identifique Outliers</h3>
              <p className="text-zinc-400">
                Nosso algoritmo destaca vídeos que estão performando 10x, 50x ou até 100x acima da média do canal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <div className="absolute -top-4 left-8 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                3
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modele o Sucesso</h3>
              <p className="text-zinc-400">
                Analise os padrões de título, thumbnail e formato. Adapte para o seu canal e multiplique suas views.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#1a1a1f]">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Funcionalidades</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Ferramentas poderosas para descobrir oportunidades escondidas no YouTube.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-[#222228] border border-zinc-800 hover:border-primary/30 transition-all">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Busca Avançada</h3>
              <p className="text-zinc-400 text-sm">
                Filtros por idioma, país, tamanho do canal, data de publicação e muito mais.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-[#222228] border border-zinc-800 hover:border-primary/30 transition-all">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Detector de Outliers</h3>
              <p className="text-zinc-400 text-sm">
                Identifique automaticamente vídeos que estão muito acima da média do canal.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-[#222228] border border-zinc-800 hover:border-primary/30 transition-all">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">ScoutScore™</h3>
              <p className="text-zinc-400 text-sm">
                Pontuação de 0 a 100 que indica o potencial viral do vídeo baseado em métricas avançadas.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-[#222228] border border-zinc-800 hover:border-primary/30 transition-all">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Salvar Favoritos</h3>
              <p className="text-zinc-400 text-sm">
                Guarde vídeos interessantes para analisar depois e acompanhe sua performance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-[#222228] border border-zinc-800 hover:border-primary/30 transition-all">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Play className="h-5 w-5 text-blue-500 fill-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Histórico de Buscas</h3>
              <p className="text-zinc-400 text-sm">
                Acesse facilmente suas pesquisas anteriores e filtros salvos.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-[#222228] border border-zinc-800 hover:border-primary/30 transition-all">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Estimativa de Ganhos</h3>
              <p className="text-zinc-400 text-sm">
                Veja quanto um vídeo pode estar gerando com base em views e CPM estimado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#15151a]">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Planos</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Escolha o plano ideal para o seu estágio como criador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <h3 className="text-xl font-bold mb-2">Grátis</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Para testar e conhecer a plataforma.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  5 buscas por dia
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Top 3 resultados
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  5 favoritos salvos
                </li>
              </ul>
              <Button asChild className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-0">
                <Link href="/login">Começar Grátis</Link>
              </Button>
            </div>

            {/* Pro Plan - Popular */}
            <div className="p-8 rounded-2xl bg-[#1a1a1f] border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 59</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Para criadores sérios que querem crescer.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Buscas ilimitadas
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Detecção de Outliers
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  ScoutScore™ completo
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Favoritos ilimitados
                </li>
              </ul>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white border-0">
                <Link href="/login">Assinar Pro</Link>
              </Button>
            </div>

            {/* Agency Plan */}
            <div className="p-8 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <h3 className="text-xl font-bold mb-2">Agência</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 199</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Para equipes e agências de marketing.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Tudo do Pro
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  5 usuários
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Exportação CSV
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Suporte prioritário
                </li>
              </ul>
              <Button asChild className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-0">
                <Link href="/login">Falar com Vendas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1a1a1f]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold md:text-5xl mb-6">
            Pronto para Encontrar sua<br />
            Próxima <span className="text-primary">Ideia Viral</span>?
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            Junte-se a milhares de criadores que já usam o TubeScout para descobrir oportunidades escondidas.
          </p>
          <Button asChild size="lg" className="h-14 px-10 rounded-lg text-lg bg-primary hover:bg-primary/90 border-0 shadow-lg shadow-primary/25">
            <Link href="/login">
              Começar Agora - É Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800 bg-[#15151a]">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <Play className="h-3 w-3 text-white fill-white ml-0.5" />
            </div>
            <span className="font-bold text-zinc-300">TubeScout</span>
          </div>
          <div>© 2026 TubeScout. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
