-- Execute this in Supabase SQL Editor to promote user to admin
-- Replace the email if necessary

UPDATE public.user_settings 
SET role = 'admin' 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'tiagotureck01@gmail.com'
);

-- Verify
SELECT * FROM public.user_settings WHERE role = 'admin';
