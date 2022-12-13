-- Drop and recreate stylist_levels table

DROP TABLE IF EXISTS times CASCADE;
CREATE TABLE times (
  id SERIAL PRIMARY KEY NOT NULL,
  time TIME NOT NULL,
  name VARCHAR(255) NOT NULL
);
