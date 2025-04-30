/*
  # Add asset versioning support

  1. New Tables
    - `asset_versions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `version` (text)
      - `category` (text)
      - `language` (text)
      - `checksum` (text)
      - `active` (boolean)
  2. Security
    - Enable RLS on `asset_versions` table
    - Add policy for authenticated users to read asset versions
*/

CREATE TABLE IF NOT EXISTS asset_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  version text NOT NULL,
  category text NOT NULL,
  language text NOT NULL,
  checksum text NOT NULL,
  active boolean DEFAULT true,
  UNIQUE(category, language, version)
);

ALTER TABLE asset_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read asset versions"
  ON asset_versions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster version lookups
CREATE INDEX IF NOT EXISTS idx_asset_versions_lookup 
ON asset_versions (category, language, version)
WHERE active = true;