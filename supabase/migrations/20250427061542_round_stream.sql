/*
  # Create profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `username` (text)
      - `full_name` (text)
      - `avatar_url` (text)
      - `language` (text)
      - `accent` (text)
      - `voice` (text)
  2. Security
    - Enable RLS on `profiles` table
    - Add policy for authenticated users to read/update their own data
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  username text,
  full_name text,
  avatar_url text,
  language text DEFAULT 'en',
  accent text DEFAULT 'en-US',
  voice text DEFAULT 'default'
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);