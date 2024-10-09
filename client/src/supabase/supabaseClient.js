import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kzcedpralmrvfptltcko.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6Y2VkcHJhbG1ydmZwdGx0Y2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMDg4NzMsImV4cCI6MjA0MzY4NDg3M30.T5XEJFG1GRERydPRf3PjXK7ZTcvDudHm6mJkQ04G49g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
