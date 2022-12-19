const db = require('../connection');

const getAllStylists = () => {
  return db.query(`
  SELECT stylists.id as id, stylists.name as name, image, bio,
    stylist_levels.name as level, array_agg(stylist_skills.service_group_id) as skills
    FROM stylists
    JOIN stylist_levels ON stylists.stylist_level_id = stylist_levels.id
    LEFT JOIN stylist_skills ON stylists.id = stylist_skills.stylist_id
    WHERE stylists.active IS true
    GROUP BY stylists.id, stylist_levels.name
    ORDER BY stylists.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getAllStylists };
