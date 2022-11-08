import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "https://iedhiggzgrkhvvelhcks.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZGhpZ2d6Z3JraHZ2ZWxoY2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0ODQzNzAsImV4cCI6MTk4MDA2MDM3MH0.Gm5yNVCsrE9G9GKlu4RLkp8k6S5kV4RpQtI_1bgUhqU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();

  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
