-- Drop and recreate stylist_skills table

DROP TABLE IF EXISTS stylist_skills CASCADE;
CREATE TABLE stylist_skills (
  id SERIAL PRIMARY KEY NOT NULL,
  service_group_id INTEGER REFERENCES service_groups(id) ON DELETE CASCADE,
  stylist_id INTEGER REFERENCES stylists(id) ON DELETE CASCADE
);
