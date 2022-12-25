-- Drop and recreate store_info table

DROP TABLE IF EXISTS store_info CASCADE;
CREATE TABLE store_info (
  id SERIAL PRIMARY KEY NOT NULL,

  name VARCHAR(255) NOT NULL,
  logo VARCHAR(512) NOT NULL,
  bio TEXT,
  tel VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);
