import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://pcjdspvgbogcuxoszkll.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjamRzcHZnYm9nY3V4b3N6a2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDY1NDksImV4cCI6MjA3NTQ4MjU0OX0.OUb0Kou-73pYdTtFvcQDFtcEBLRDk83cXuogzCeQvQw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
