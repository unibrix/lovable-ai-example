-- Add user_id column to chat_messages
ALTER TABLE public.chat_messages 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing permissive RLS policies
DROP POLICY IF EXISTS "Anyone can create chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can delete chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can view chat messages" ON public.chat_messages;

-- Create owner-based RLS policies
CREATE POLICY "Users can view their own chat messages"
ON public.chat_messages
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages"
ON public.chat_messages
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat messages"
ON public.chat_messages
FOR DELETE
USING (auth.uid() = user_id);