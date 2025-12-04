-- Add user_id column to notes table
ALTER TABLE public.notes 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can create notes" ON public.notes;
DROP POLICY IF EXISTS "Anyone can delete notes" ON public.notes;
DROP POLICY IF EXISTS "Anyone can update notes" ON public.notes;
DROP POLICY IF EXISTS "Anyone can view notes" ON public.notes;

-- Create owner-based RLS policies
CREATE POLICY "Users can view their own notes" 
ON public.notes 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes" 
ON public.notes 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
ON public.notes 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
ON public.notes 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);