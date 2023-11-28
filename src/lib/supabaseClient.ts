import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://xmutyxjqddxwqqacfxwt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXR5eGpxZGR4d3FxYWNmeHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNDI3MDUsImV4cCI6MjAxNjYxODcwNX0.p2Rk9nFxWAtwVPSOL7VKnq6T0JnJzcoazPBJU3frRvU';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;