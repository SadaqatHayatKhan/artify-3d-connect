
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iqjzlqbvcfjewvdyvbys.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxanpscWJ2Y2ZqZXd2ZHl2YnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MzgzMzQsImV4cCI6MjA2MzAxNDMzNH0.-PxWtJ1j-6p1sMgGOeTb4IEks6QTgG-49Pk24ER6_D4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true
  }
});
