-- Drop and recreate open_hours table

DROP TABLE IF EXISTS open_hours CASCADE;
CREATE TABLE open_hours (
  id SERIAL PRIMARY KEY NOT NULL,
  week_day_id INTEGER REFERENCES week_days(id) ON DELETE CASCADE,

  open_time TIME NOT NULL,
  close_time TIME NOT NULL
);
