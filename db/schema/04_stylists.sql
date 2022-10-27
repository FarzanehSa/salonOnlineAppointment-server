-- Drop and recreate stylists table

DROP TABLE IF EXISTS stylists CASCADE;
CREATE TABLE stylists (
  id SERIAL PRIMARY KEY NOT NULL,
  stylist_level_id INTEGER REFERENCES stylist_levels(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  image VARCHAR(512),
  bio TEXT
);
