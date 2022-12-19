const db = require('../../../connection');

const addStylist = (name, image, bio, level) => {
  return db.query(`
    INSERT INTO stylists (name, image, bio, stylist_level_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, [name, image, bio, level]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addStylist };
