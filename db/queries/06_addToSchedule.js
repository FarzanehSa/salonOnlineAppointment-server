const db = require('../connection');

const addToSchedule = (stylistId, userId, date, startTime) => {
  return db.query(`
  INSERT INTO schedule
  (stylist_id, user_id, date, start_time)
  VALUES ($1, $2, $3, $4)
  RETURNING * ;`, [stylistId, userId, date, startTime]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { addToSchedule };
