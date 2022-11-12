const db = require('../connection');

const addToSchedule = (stylistId, userId, date, startTime, endTime) => {
  return db.query(`
  INSERT INTO schedule
  (stylist_id, user_id, date, start_time, end_time)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING * ;`, [stylistId, userId, date, startTime, endTime]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { addToSchedule };
