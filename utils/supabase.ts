import { createClient } from '@supabase/supabase-js'
import { Database } from '../src/types/database.types'

const supabaseUrl = "https://dmaehbofejwzwchdduug.supabase.co"
const supabaseAnonKey = "sb_publishable_6WAV5ngRcOHO7ueg-_bw6g_gXAuQqcz"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)