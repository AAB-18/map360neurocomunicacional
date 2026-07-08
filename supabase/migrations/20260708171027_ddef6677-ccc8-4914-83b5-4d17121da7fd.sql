
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============ AUTO-ASSIGN ROLE ON SIGNUP ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO user_count FROM auth.users;
  -- First user becomes admin, all others get 'user'
  IF user_count = 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ ACCESS TOKENS ============
CREATE TYPE public.token_status AS ENUM ('active', 'used', 'expired', 'revoked');

CREATE TABLE public.access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE,
  status token_status NOT NULL DEFAULT 'active',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
  used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  browser TEXT,
  device TEXT,
  notes TEXT
);

CREATE INDEX idx_access_tokens_token ON public.access_tokens(token);
CREATE INDEX idx_access_tokens_status ON public.access_tokens(status);

GRANT SELECT ON public.access_tokens TO authenticated;
GRANT ALL ON public.access_tokens TO service_role;

ALTER TABLE public.access_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all tokens"
ON public.access_tokens FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert tokens"
ON public.access_tokens FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tokens"
ON public.access_tokens FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tokens"
ON public.access_tokens FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============ PARTICIPANTS ============
CREATE TABLE public.participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_id UUID REFERENCES public.access_tokens(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  profession TEXT NOT NULL,
  education TEXT NOT NULL,
  company TEXT,
  role_position TEXT,
  city TEXT,
  state TEXT,
  referral TEXT,
  lgpd_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_participants_email ON public.participants(email);
CREATE INDEX idx_participants_token ON public.participants(token_id);

GRANT SELECT ON public.participants TO authenticated;
GRANT ALL ON public.participants TO service_role;

ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all participants"
ON public.participants FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============ TEST RESULTS ============
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES public.participants(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score_s INTEGER NOT NULL DEFAULT 0,
  score_r INTEGER NOT NULL DEFAULT 0,
  score_v INTEGER NOT NULL DEFAULT 0,
  score_p INTEGER NOT NULL DEFAULT 0,
  dominant_profile TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_test_results_participant ON public.test_results(participant_id);

GRANT SELECT ON public.test_results TO authenticated;
GRANT ALL ON public.test_results TO service_role;

ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all results"
ON public.test_results FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
