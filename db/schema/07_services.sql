-- Drop and recreate services table

DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services (
  id SERIAL PRIMARY KEY NOT NULL,
  service_group_id INTEGER REFERENCES service_groups(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  price SMALLINT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL
);
