import { createClient } from "@supabase/supabase-js";
import { PUBLIC_API_KEY, PUBLIC_API_URL } from "$env/static/public";

const supabaseUrl = PUBLIC_API_URL;
const supabaseKey = PUBLIC_API_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;