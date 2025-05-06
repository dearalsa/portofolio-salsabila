import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ezwywnlnmjgsltjafjnh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6d3l3bmxubWpnc2x0amFmam5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDQ5ODgsImV4cCI6MjA2MTY4MDk4OH0.TBuzYBVgCYQAZod3jtVGTUhvqyDl6NW07UyOFaFQo8g'
export const supabase = createClient(supabaseUrl, supabaseKey)
