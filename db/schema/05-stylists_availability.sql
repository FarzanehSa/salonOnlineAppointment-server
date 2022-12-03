-- Drop and recreate stylists_availability table

DROP TABLE IF EXISTS stylists_availability CASCADE;
CREATE TABLE stylists_availability (
  id SERIAL PRIMARY KEY NOT NULL,
  week_day_id INTEGER REFERENCES week_days(id) ON DELETE CASCADE,
  stylist_id INTEGER REFERENCES stylists(id) ON DELETE CASCADE,

  start_time TIME,
  end_time TIME
);
