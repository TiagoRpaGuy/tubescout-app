"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Play, Search, TrendingUp, Zap, Target, Sparkles, BarChart3, Clock, Star, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F14] text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0F0F14]/90 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#F97316] to-[#FB923C]">
              <Target className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">TubeScout</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#features" className="hover:text-white transition-colors">Recursos</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Entrar
            </Link>
            <Button asChild className="bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:opacity-90 text-white border-0 rounded-lg px-5 shadow-lg shadow-orange-500/25">
              <Link href="/login">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#F97316]/20 to-[#FB923C]/20 blur-[140px] rounded-full pointer-events-none animate-pulse" />

        <div className="container relative z-10 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-400 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <Sparkles className="h-4 w-4" />
            +12.000 criadores garimpando ideias
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight md:text-6xl lg:text-7xl mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Pare de Copiar Tendências Mortas.{" "}
            <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
              Descubra o Que Vai Viralizar
            </span>
            <br />
            Antes da Concorrência.
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-2xl text-lg text-zinc-400 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
            TubeScout vasculha milhões de canais pequenos para encontrar vídeos que estão{" "}
            <strong className="text-white">explodindo AGORA</strong> - antes de aparecerem na página inicial do YouTube.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button asChild size="lg" className="h-14 px-8 rounded-xl text-lg bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:opacity-90 border-0 shadow-xl shadow-orange-500/30 transition-all hover:scale-105">
              <Link href="/login">
                Começar a Garimpar Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg border-zinc-700 bg-transparent hover:bg-zinc-800/50 text-white transition-all hover:border-orange-500/50">
              <Link href="#como-funciona">
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração (2 min)
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-orange-500" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-orange-500" />
              <span>+1M de vídeos analisados</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-orange-500" />
              <span>Atualizado em tempo real</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24 bg-[#15151a]">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl mb-4">3 Passos para Nunca Mais Ficar Sem Ideias</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Simples, rápido e eficaz. Encontre oportunidades de conteúdo que você nunca veria de outra forma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1f] to-[#222229] border border-zinc-800 hover:border-orange-500/30 transition-all group">
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                1
              </div>
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Defina Seu Território</h3>
              <p className="text-zinc-400">
                Escolha seu nicho, idioma e tamanho de canal. O TubeScout vai focar apenas onde há ouro escondido.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1f] to-[#222229] border border-zinc-800 hover:border-orange-500/30 transition-all group">
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                2
              </div>
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Encontre Pepitas de Ouro</h3>
              <p className="text-zinc-400">
                Nossa IA identifica vídeos que estão performando 5x, 10x ou até 50x acima da média do canal - sinais claros de conteúdo que está ressoando.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1f] to-[#222229] border border-zinc-800 hover:border-orange-500/30 transition-all group">
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                3
              </div>
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Adapte e Publique</h3>
              <p className="text-zinc-400">
                Analise o padrão de sucesso (título, thumbnail, formato) e crie sua própria versão. Simples assim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0F0F14]">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Ferramentas de Garimpo Profissional</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Tudo que você precisa para descobrir oportunidades escondidas no YouTube.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Radar de Tendências</h3>
              <p className="text-zinc-400 text-sm">
                Monitore nichos específicos e receba alertas quando vídeos começarem a decolar. Seja o primeiro a surfar a onda.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Análise de Padrões</h3>
              <p className="text-zinc-400 text-sm">
                Veja exatamente o que está funcionando: duração ideal, tipo de thumbnail, estrutura de título. Dados, não achismos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <Star className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Biblioteca de Inspiração</h3>
              <p className="text-zinc-400 text-sm">
                Salve vídeos promissores e acompanhe sua evolução. Construa um banco de ideias validadas pelo mercado.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Filtros Cirúrgicos</h3>
              <p className="text-zinc-400 text-sm">
                Busque por data, views, engajamento, tamanho de canal e mais. Encontre exatamente o que você precisa.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">ScoutScore™</h3>
              <p className="text-zinc-400 text-sm">
                Pontuação de 0-100 que indica o potencial viral. Quanto maior, mais provável que o formato funcione.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-cyan-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Histórico Inteligente</h3>
              <p className="text-zinc-400 text-sm">
                Suas buscas anteriores ficam salvas. Volte e veja como aqueles vídeos evoluíram desde a última vez.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-[#15151a]">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">Criadores Reais, Resultados Reais</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Veja como o TubeScout está ajudando criadores a encontrar ideias vencedoras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-sm">Marina Costa</p>
                  <p className="text-xs text-zinc-500">Canal de Receitas • 85K subs</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm italic">
                "Encontrei um vídeo de panqueca que estava viralizando em um canal pequeno. Adaptei para meu nicho e fiz 500K views em 3 dias!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  RS
                </div>
                <div>
                  <p className="font-semibold text-sm">Rafael Santos</p>
                  <p className="text-xs text-zinc-500">Tech Reviews • 120K subs</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm italic">
                "Uso o TubeScout toda semana. Já achei 3 formatos que se tornaram série no meu canal. Ferramenta essencial."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-2xl bg-[#1a1a1f] border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  LA
                </div>
                <div>
                  <p className="font-semibold text-sm">Lucas Almeida</p>
                  <p className="text-xs text-zinc-500">Gaming • 45K subs</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm italic">
                "Descobri um nicho de gameplay que ninguém estava explorando. Cresci 20K inscritos em 2 meses graças ao TubeScout."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#0F0F14]">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-5xl mb-4">Escolha Seu Plano de Garimpo</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Comece grátis e evolua conforme seu canal cresce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Plan - Explorador */}
            <div className="p-8 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-zinc-700 transition-all">
              <h3 className="text-xl font-bold mb-2">Explorador</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Para testar e conhecer a plataforma.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  10 buscas por dia
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  Top 5 resultados
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  10 favoritos salvos
                </li>
              </ul>
              <Button asChild className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-0 rounded-xl">
                <Link href="/login">Começar Exploração Grátis</Link>
              </Button>
            </div>

            {/* Pro Plan - Garimpeiro */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1f] to-[#222229] border-2 border-orange-500 relative shadow-xl shadow-orange-500/20 scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                MAIS POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Garimpeiro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 59</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Para criadores sérios que querem crescer.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  Buscas ilimitadas
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  Resultados completos
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  Favoritos ilimitados
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  ScoutScore™ completo
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:opacity-90 text-white border-0 rounded-xl shadow-lg shadow-orange-500/30">
                <Link href="/login">Virar Garimpeiro Pro</Link>
              </Button>
            </div>

            {/* Agency Plan - Mineradora */}
            <div className="p-8 rounded-2xl bg-[#1a1a1f] border border-zinc-800 hover:border-zinc-700 transition-all">
              <h3 className="text-xl font-bold mb-2">Mineradora</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 199</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">Para equipes e agências de marketing.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  Tudo do Garimpeiro
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  10 usuários
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  Exportação CSV
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  Suporte prioritário
                </li>
              </ul>
              <Button asChild className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-0 rounded-xl">
                <Link href="/login">Falar com Especialista</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#15151a]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold md:text-5xl mb-6">
            Sua Próxima Ideia Viral{" "}
            <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
              Está Esperando
            </span>
            .<br />
            Você Só Precisa Encontrá-la.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            Mais de 12.000 criadores já usam o TubeScout para descobrir oportunidades que a concorrência nem sabe que existem.
          </p>
          <Button asChild size="lg" className="h-14 px-10 rounded-xl text-lg bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:opacity-90 border-0 shadow-xl shadow-orange-500/30 transition-all hover:scale-105">
            <Link href="/login">
              Começar Garimpo Grátis - Sem Cartão
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800 bg-[#0F0F14]">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center">
              <Target className="h-3 w-3 text-white" />
            </div>
            <span className="font-bold text-zinc-300">TubeScout</span>
          </div>
          <div>© 2026 TubeScout. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
