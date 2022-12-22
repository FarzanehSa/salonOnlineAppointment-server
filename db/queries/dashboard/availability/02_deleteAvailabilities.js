const db = require('../../../connection');

const deleteAvailabilities= (id) => {
  return db.query(`
    DELETE FROM stylists_availability
    WHERE stylists_availability.stylist_id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteAvailabilities };
