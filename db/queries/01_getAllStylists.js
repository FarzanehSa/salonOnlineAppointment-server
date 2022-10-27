const db = require('../connection');

const getAllStylists = () => {
  return db.query(`
  SELECT stylists.id as id, stylists.name as name, image, bio,
    stylist_levels.name as level
    FROM stylists
    JOIN stylist_levels ON stylists.stylist_level_id = stylist_levels.id
    ORDER BY stylists.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getAllStylists };
