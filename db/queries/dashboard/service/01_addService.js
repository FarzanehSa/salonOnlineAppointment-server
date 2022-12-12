const db = require('../../../connection');

const addService = (groupId, service, price, description, duration) => {
  return db.query(`
    INSERT INTO services (service_group_id, name, price, description, duration)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`, [groupId, service, price, description, duration]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addService };
