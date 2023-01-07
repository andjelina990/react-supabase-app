import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gniihqintglljxgukipx.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaWlocWludGdsbGp4Z3VraXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NjQ2NzEsImV4cCI6MTk4ODM0MDY3MX0.n5IM6z3iba--SfDEGkI8Y6ZOLZqSdaKv8Yk64n4kux0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
