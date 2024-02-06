import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://rooguivlderuvcpkzldr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvb2d1aXZsZGVydXZjcGt6bGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NjI3NzAsImV4cCI6MjAyMTUzODc3MH0.X6tuLNntw35zKgiaPFEy7YRyIsgXnMLCgxknK7B8gfo'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;