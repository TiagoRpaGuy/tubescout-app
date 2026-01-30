-- ============================================
-- TubeScout - Gerenciamento de Usuário de Teste
-- ============================================

-- PASSO 1: Habilitar Email Auth no Supabase
-- Vá em: Supabase Dashboard > Authentication > Providers > Email
-- Ative "Enable Email Signup" e "Confirm Email" (desligado para testes)

-- PASSO 2: Criar usuário de teste (rode uma vez)
-- Substitua a senha conforme desejar
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'teste@tubescout.com.br',
  crypt('TubeScout2024!', gen_salt('bf')), -- Senha: TubeScout2024!
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Usuário Teste"}',
  false,
  'authenticated',
  'authenticated'
)
ON CONFLICT (email) DO NOTHING;

-- PASSO 3: Criar configurações do usuário
INSERT INTO public.user_settings (user_id, role)
SELECT id, 'user'::public.user_role
FROM auth.users 
WHERE email = 'teste@tubescout.com.br'
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- COMANDOS ÚTEIS DE GERENCIAMENTO
-- ============================================

-- [DESATIVAR] Bloquear acesso do usuário de teste
-- UPDATE auth.users SET banned_until = '2099-12-31' WHERE email = 'teste@tubescout.com.br';

-- [ATIVAR] Desbloquear acesso do usuário de teste
-- UPDATE auth.users SET banned_until = NULL WHERE email = 'teste@tubescout.com.br';

-- [ALTERAR SENHA] Mudar a senha do usuário de teste
-- UPDATE auth.users SET encrypted_password = crypt('NovaSenha123!', gen_salt('bf')) WHERE email = 'teste@tubescout.com.br';

-- [VERIFICAR STATUS] Ver status do usuário
-- SELECT email, banned_until, email_confirmed_at FROM auth.users WHERE email = 'teste@tubescout.com.br';

-- [DELETAR] Remover completamente o usuário
-- DELETE FROM public.user_settings WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'teste@tubescout.com.br');
-- DELETE FROM auth.users WHERE email = 'teste@tubescout.com.br';
