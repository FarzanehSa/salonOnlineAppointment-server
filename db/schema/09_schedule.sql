-- Drop and recreate schedule table

DROP TABLE IF EXISTS schedule CASCADE;
CREATE TABLE schedule (
  id SERIAL PRIMARY KEY NOT NULL,
  stylist_id INTEGER REFERENCES stylists(id) ON DELETE CASCADE,
  date Date NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);
