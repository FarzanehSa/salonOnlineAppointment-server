const db = require('../connection');

const getAllBookedForDate = (date) => {
  return db.query(`
  SELECT id, user_id as userid, stylist_id as stylistid, date,
    to_char(start_time,'HH24:MI') as start
    FROM schedule
    WHERE date = $1
    ;`, [date]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getAllBookedForDate };
