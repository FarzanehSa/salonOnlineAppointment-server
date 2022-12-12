const db = require('../../../connection');

const deleteServiceGroup = (id) => {
  return db.query(`
    UPDATE service_groups
    SET active = false
    WHERE service_groups.id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteServiceGroup };
