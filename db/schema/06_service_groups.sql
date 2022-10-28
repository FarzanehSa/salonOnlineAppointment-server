-- Drop and recreate service_groups table

DROP TABLE IF EXISTS service_groups CASCADE;
CREATE TABLE service_groups (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
