# TubeScout 🔭

**Plataforma de Inteligência para Criadores e Estrategistas do YouTube.**
O TubeScout ajuda você a descobrir vídeos "outliers" (fora da curva) — conteúdo com performance muito acima da média do criador — para identificar tendências antes que elas se tornem populares.

![Preview do TubeScout](public/preview.png)

---

## 🚀 Como Rodar o Projeto (Passo a Passo)

Siga estes passos para rodar o sistema no seu computador agora mesmo.

### 1. Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- Uma conta no **Supabase** (para o banco de dados)

### 2. Instalação

Abra o seu terminal (Prompt de Comando ou PowerShell) e rode:

```bash
# 1. Instalar as dependências do projeto
npm install
```

### 3. Configuração (Variáveis de Ambiente)

Crie um arquivo chamado `.env.local` na raiz do projeto e cole suas chaves (se já tiver):

```bash
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 4. Rodar o Projeto ▶️

Este é o comando principal para iniciar o sistema:

```bash
npm run dev
```

Após rodar esse comando, abra seu navegador em: **[http://localhost:3001](http://localhost:3001)**

---

## 🛠️ Funcionalidades

- **🔎 Radar de Outliers**: Encontre vídeos com alta taxa de visualização vs inscritos.
- **📈 ScoutScore™**: Nossa métrica exclusiva (0-100) que combina velocidade de crescimento e engajamento.
- **🔐 Login e Segurança**: Integração com Google e sistema de Admin/Usuário.
- **💳 Planos e Assinaturas**: Estrutura pronta para planos (Scout Grátis até Agency).
- **🌑 Interface Premium**: Design Dark Mode estilo Vercel, focado em dados.

---

## 👑 Guia do Administrador

O sistema possui um Painel Admin protegido (`/admin`) para monitorar usuários.

### Como virar Admin

Por padrão, todo usuário entra como `user`. Para virar `admin`:

1.  Faça login no app com seu Google.
2.  Vá no Painel SQL do Supabase e rode:
    ```sql
    UPDATE public.user_settings
    SET role = 'admin'
    WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'seu_email@gmail.com');
    ```
3.  Acesse **[http://localhost:3001/admin](http://localhost:3001/admin)**.

---

## 🧪 Como Testar

### Fluxo de Teste Manual

1.  **Landing Page**: Abra `http://localhost:3001`. Veja se os botões levam para Login.
2.  **Login**: Clique em "Entrar com Google". Deve redirecionar para `/app`.
3.  **Proteção**: Tente acessar `/admin` sendo um usuário normal. O sistema deve te jogar de volta para `/app`.
4.  **Admin**: Logue como admin e acesse `/admin`. Deve ver os gráficos.
5.  **Busca**: Em `/app`, digite "minecraft" ou "finanças". Veja os resultados carregarem.

### Comandos Úteis

| Comando         | O que faz                                                       |
| --------------- | --------------------------------------------------------------- |
| `npm run dev`   | Roda o servidor de desenvolvimento (Esse é o que você mais usa) |
| `npm run build` | Cria a versão de produção (para deploy)                         |
| `npm run start` | Roda a versão de produção localmente                            |
| `npm run lint`  | Verifica erros no código                                        |

---

_Desenvolvido pela Equipe TubeScout._
