const db = require('../../../connection');

const updateService = (id, service, groupId, price, description, duration) => {
  return db.query(`
    UPDATE services
    SET name = $2, service_group_id = $3,
      price = $4, description = $5, duration = $6
    WHERE services.id = $1
    RETURNING *;`, [id, service, groupId, price, description, duration]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { updateService };
