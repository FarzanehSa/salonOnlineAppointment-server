const db = require('../../../connection');

const getAppointmentsReport = (stylist, service, date, exactReq) => {

  let timeSelect = ``;
  let stylistSelect = ``;
  let serviceSelect = ``;
  let paramArr = [date]
  if (exactReq) {timeSelect = ` Where schedule.date = $1`;}
  if (!exactReq) {timeSelect = ` Where schedule.date >= $1`;}
  if (stylist !== 'all') {
    paramArr.push(stylist);
    stylistSelect = ` AND schedule.stylist_id = $${paramArr.length}`;
  }

  if (service !== 'all') {
    paramArr.push(service);
    serviceSelect = ` AND schedule.service_id = $${paramArr.length}`;
  }

  const queryString = `SELECT schedule.id as id,
  to_char(schedule.start_time,'HH24:MI') as start,
  to_char(schedule.end_time,'HH24:MI') as end,
  schedule.date,
  schedule.user_id, schedule.service_id, schedule.stylist_id,
  services.name as service, stylists.name as stylist,
  users.firstname, users.lastname, users.tel
  FROM schedule
  JOIN stylists ON stylists.id = schedule.stylist_id
  JOIN services ON services.id = schedule.service_id
  JOIN users ON users.id = schedule.user_id`
  + timeSelect + stylistSelect + serviceSelect +
  ` ORDER BY schedule.date, schedule.start_time;`
  return db.query(`${queryString}`, [...paramArr]
    )
    .then(data => {
      return data.rows;
    });
  }

  module.exports = { getAppointmentsReport };
