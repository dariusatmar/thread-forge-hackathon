-- Create confirmedIncidents table in team_thread_forge schema
CREATE TABLE IF NOT EXISTS team_thread_forge."confirmedIncidents" (
  incident_id SERIAL PRIMARY KEY,
  zip_code VARCHAR(10) NOT NULL,
  outage_start_time TIMESTAMP(6) NOT NULL,
  outage_end_time TIMESTAMP(6) NOT NULL,
  affected_customers INTEGER NOT NULL,
  incident_summary TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Unresolved' NOT NULL,
  created_at TIMESTAMP(6) DEFAULT NOW() NOT NULL
);

-- Create index on zip_code for faster queries
CREATE INDEX IF NOT EXISTS idx_confirmed_incidents_zip ON team_thread_forge."confirmedIncidents"(zip_code);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_confirmed_incidents_created_at ON team_thread_forge."confirmedIncidents"(created_at);

