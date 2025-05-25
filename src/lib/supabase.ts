import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Slot {
  id: string;
  start_time: string;
  end_time: string;
}

export interface Booking {
  id: string;
  venue_id: string;
  slot_id: string;
  booking_date: string;
  booking_name: string;
  persons: number;
  whatsapp: string;
  email: string;
  decoration: boolean;
  advance_paid: boolean;
  payment_id?: string;
  created_at: string;
}