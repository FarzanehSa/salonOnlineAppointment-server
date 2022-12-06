const db = require('../connection');

const deleteAppointent = (id) => {
  return db.query(`
  DELETE FROM schedule
    WHERE schedule.id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteAppointent };
