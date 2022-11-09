-- Drop and recreate stylist_levels table

DROP TABLE IF EXISTS stylist_levels CASCADE;
CREATE TABLE stylist_levels (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
