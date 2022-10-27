-- Drop and recreate stylist_Levels table

DROP TABLE IF EXISTS stylist_Levels CASCADE;
CREATE TABLE stylist_Levels (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
