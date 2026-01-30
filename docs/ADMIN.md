# Manual do Administrador

Este guia detalha como gerenciar o sistema TubeScout.

## 1. Controle de Acesso (Quem é quem?)

O sistema usa uma coluna `role` (papel) no banco de dados:

- `user`: Acesso padrão (Buscar, Favoritos, Histórico).
- `admin`: Acesso total + Painel Administrativo (`/admin`).

### Segurança

- **Admins**: Podem ver estatísticas e todos os usuários.
- **Proteção**: O sistema bloqueia automaticamente qualquer um que tente acessar `/admin` sem permissão.

## 2. Gerenciando Usuários

Atualmente, você gerencia usuários pelo Banco de Dados (Supabase) ou vê a lista básica no `/admin`.

### Como saber se sou Admin?

Rode isso no SQL do Supabase para conferir os admins atuais:

```sql
SELECT email, role
FROM auth.users
JOIN public.user_settings ON auth.users.id = public.user_settings.user_id
WHERE role = 'admin';
```

## 3. Configuração de Preços

Os preços dos planos ficam no código para maior segurança.
Para alterar valores:

1. Edite o arquivo `src/lib/stripe/config.ts`.
2. Atualize também o visual em `src/app/page.tsx` (na tabela de preços).

## 4. Problemas de Login no Admin?

Se você não consegue entrar em `/admin`:

1. Verifique se está logado.
2. Verifique seu papel no banco de dados.
3. Se estiver em branco ou null, rode o script `scripts/promote_admin.sql` no Supabase.

## 5. Integração com Stripe (Pagamentos)

O sistema está "Pronto para Stripe". Para cobrar de verdade:

1. Coloque as chaves `STRIPE_SECRET_KEY` no `.env`.
2. Crie os Produtos no painel da Stripe (Scout, Starter, etc).
3. Atualize os IDs no arquivo de configuração do projeto.
