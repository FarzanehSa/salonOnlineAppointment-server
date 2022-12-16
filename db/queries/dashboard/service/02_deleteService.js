const db = require('../../../connection');

const deleteService = (id) => {
  return db.query(`
    UPDATE services
    SET active = false
    WHERE services.id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteService };
