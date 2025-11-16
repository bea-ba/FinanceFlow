-- Add onboarding_completed field to profiles table
ALTER TABLE public.profiles
ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT false;

-- Create index for faster queries
CREATE INDEX idx_profiles_onboarding_completed ON public.profiles(onboarding_completed);
