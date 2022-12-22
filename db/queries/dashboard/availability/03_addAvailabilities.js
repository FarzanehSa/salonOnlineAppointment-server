const db = require('../../../connection');

const addAvailabilities = (dayId, stylistId, start, end) => {
  return db.query(`
    INSERT INTO stylists_availability (week_day_id, stylist_id, start_time, end_time)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, [dayId, stylistId, start, end]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addAvailabilities };
