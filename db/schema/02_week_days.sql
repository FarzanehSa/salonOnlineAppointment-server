-- Drop and recreate week_days table

DROP TABLE IF EXISTS week_days CASCADE;
CREATE TABLE week_days (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
