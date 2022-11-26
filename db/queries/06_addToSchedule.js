const db = require('../connection');

const addToSchedule = (stylistId, serviceId, userId, date, startTime, endTime) => {
  return db.query(`
  INSERT INTO schedule
  (stylist_id, service_id, user_id, date, start_time, end_time)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING * ;`, [stylistId, serviceId, userId, date, startTime, endTime]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { addToSchedule };
