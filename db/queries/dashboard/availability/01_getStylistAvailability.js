const db = require('../../../connection');

const getStylistAvailability = (id) => {
  return db.query(`
  SELECT stylists_availability.id as id,
    to_char(start_time,'HH24:MI') as start,
    to_char(end_time,'HH24:MI') as end,
    stylists.name as name, week_days.name as day, week_days.id as dayId
    FROM stylists_availability
    JOIN stylists ON stylists_availability.stylist_id = stylists.id
    JOIN week_days ON stylists_availability.week_day_id = week_days.id
    WHERE stylists.active IS true AND stylists.id = $1
    ORDER BY week_days.id;`, [id]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getStylistAvailability };
