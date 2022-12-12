const db = require('../../../connection');

const addServiceGroup = (name) => {
  return db.query(`
    INSERT INTO service_groups (name)
    VALUES ($1)
    RETURNING *;`, [name]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addServiceGroup };
