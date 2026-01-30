export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          Erro de Autenticação
        </h1>
        <p className="text-muted-foreground mb-6">
          Houve um problema ao processar seu login. Por favor, tente novamente.
        </p>
        <a
          href="/login"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Voltar para Login
        </a>
      </div>
    </div>
  )
}
