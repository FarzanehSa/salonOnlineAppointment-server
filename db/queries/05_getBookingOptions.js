const db = require('../connection');

const getBookingOptions = (groupId, dayName) => {
  return db.query(`
  SELECT stylists_availability.stylist_id,
  to_char(stylists_availability.start_time,'HH24:MI') as start,
  to_char(stylists_availability.end_time,'HH24:MI') as end
    FROM stylists_availability
    JOIN stylist_skills ON stylist_skills.stylist_id = stylists_availability.stylist_id
    JOIN week_days ON week_days.id = stylists_availability.week_day_id
    WHERE stylist_skills.service_group_id = $1 AND week_days.name = $2
    ;`, [groupId, dayName]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getBookingOptions };
