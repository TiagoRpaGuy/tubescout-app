-- ============================================
-- TubeScout - Criar Usuários (Simplified)
-- ============================================
-- Versão simplificada - apenas cria usuários no auth

-- 1. DELETAR USUÁRIOS EXISTENTES (se houver)
-- ============================================
DELETE FROM auth.users 
WHERE email IN ('tiagotureck01@gmail.com', 'teste@gmail.com');

-- 2. CRIAR USUÁRIO ADMIN (Tiago)
-- ============================================
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'tiagotureck01@gmail.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Tiago","role":"admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- 3. CRIAR USUÁRIO DE TESTE
-- ============================================
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'teste@gmail.com',
  crypt('teste@gmail.com', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Teste","role":"user"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- ============================================
-- VERIFICAR CRIAÇÃO
-- ============================================
SELECT 
  email,
  email_confirmed_at,
  raw_user_meta_data->>'name' as name,
  raw_user_meta_data->>'role' as role,
  created_at
FROM auth.users
WHERE email IN ('tiagotureck01@gmail.com', 'teste@gmail.com')
ORDER BY email;

-- ============================================
-- CREDENCIAIS
-- ============================================
-- Admin:
--   Email: tiagotureck01@gmail.com
--   Senha: admin123
--
-- Teste:
--   Email: teste@gmail.com
--   Senha: teste@gmail.com
