const db = require('../connection');

const getAllPastAppointmentsByUser = (id, date, time) => {
  return db.query(`
  SELECT schedule.id as id, to_char(schedule.start_time,'HH24:MI') as time,
    schedule.date,
    services.name as service, stylists.name as stylist
    FROM schedule
    JOIN stylists ON stylists.id = schedule.stylist_id
    JOIN services ON services.id = schedule.service_id
    WHERE schedule.user_id = $1 AND ( schedule.date < $2 OR (schedule.date = $2 AND schedule.start_time < $3))
    ORDER BY schedule.date DESC, schedule.start_time DESC;`, [id, date, time]
    )
    .then(data => {
      return data.rows;
    });
  }

  module.exports = { getAllPastAppointmentsByUser };
