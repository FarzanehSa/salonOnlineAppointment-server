const db = require('../../../connection');

const updateServiceGroup = (id, group) => {
  return db.query(`
    UPDATE service_groups
    SET name = $2
    WHERE service_groups.id = $1
    RETURNING *;`, [id, group]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateServiceGroup };
