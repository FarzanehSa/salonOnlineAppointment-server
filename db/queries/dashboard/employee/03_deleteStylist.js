const db = require('../../../connection');

const deleteStylist = (id) => {
  return db.query(`
    UPDATE stylists
    SET active = false
    WHERE stylists.id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteStylist };
