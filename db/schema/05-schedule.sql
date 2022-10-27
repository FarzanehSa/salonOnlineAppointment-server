-- Drop and recreate schedule table

DROP TABLE IF EXISTS schedule CASCADE;
CREATE TABLE schedule (
  id SERIAL PRIMARY KEY NOT NULL,
  week_day_id INTEGER REFERENCES week_days(id) ON DELETE CASCADE,
  stylist_id INTEGER REFERENCES stylists(id) ON DELETE CASCADE,

  start_time TIME,
  end_time TIME,
  off_day BOOLEAN NOT NULL DEFAULT true
);
