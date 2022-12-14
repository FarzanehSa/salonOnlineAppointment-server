-- Drop and recreate schedule table

DROP TABLE IF EXISTS schedule CASCADE;
CREATE TABLE schedule (
  id SERIAL PRIMARY KEY NOT NULL,
  stylist_id INTEGER REFERENCES stylists(id) ON DELETE CASCADE,
  service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL,
  date Date NOT NULL,
  end_time TIME NOT NULL,
  start_time TIME NOT NULL
);
