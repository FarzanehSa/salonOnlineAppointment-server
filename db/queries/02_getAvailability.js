const db = require('../connection');

const getAvailability = () => {
  return db.query(`
  SELECT stylists_availability.id as id, start_time as start, end_time as end,
    stylists.name as name, week_days.name as day
    FROM stylists_availability
    JOIN stylists ON stylists_availability.stylist_id = stylists.id
    JOIN week_days ON stylists_availability.week_day_id = week_days.id
    ORDER BY stylists.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getAvailability };
