const db = require('../../../connection');

const updateStylist = (id, name, image, bio, level) => {
  return db.query(`
    UPDATE stylists
    SET name = $2, image = $3, bio = $4, stylist_level_id = $5
    WHERE stylists.id = $1
    RETURNING *;`, [id, name, image, bio, level]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateStylist };
