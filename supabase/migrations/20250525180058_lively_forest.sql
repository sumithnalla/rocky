/*
  # Initial Schema Setup for Booking System

  1. New Tables
    - `slots`
      - `id` (uuid, primary key)
      - `venue_id` (uuid, foreign key)
      - `start_time` (time)
      - `end_time` (time)
      - `date` (date)
      - `created_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `venue_id` (uuid, foreign key)
      - `slot_id` (uuid, foreign key)
      - `booking_date` (date)
      - `booking_name` (text)
      - `persons` (integer)
      - `whatsapp` (text)
      - `email` (text)
      - `decoration` (boolean)
      - `advance_paid` (boolean)
      - `payment_id` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create slots table
CREATE TABLE IF NOT EXISTS slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(venue_id, date, start_time, end_time)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid NOT NULL,
  slot_id uuid REFERENCES slots(id),
  booking_date date NOT NULL,
  booking_name text NOT NULL,
  persons integer NOT NULL CHECK (persons > 0),
  whatsapp text NOT NULL,
  email text NOT NULL,
  decoration boolean DEFAULT false,
  advance_paid boolean DEFAULT false,
  payment_id text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access for slots"
  ON slots FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert for bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public read access for bookings"
  ON bookings FOR SELECT
  TO public
  USING (true);

-- Create helper functions
CREATE OR REPLACE FUNCTION get_available_slots(
  p_venue_id uuid,
  p_date date
)
RETURNS TABLE (
  id uuid,
  start_time time,
  end_time time
) AS $$
BEGIN
  RETURN QUERY
  SELECT s.id, s.start_time, s.end_time
  FROM slots s
  WHERE s.venue_id = p_venue_id
    AND s.date = p_date
    AND NOT EXISTS (
      SELECT 1
      FROM bookings b
      WHERE b.slot_id = s.id
        AND b.booking_date = p_date
    )
  ORDER BY s.start_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;