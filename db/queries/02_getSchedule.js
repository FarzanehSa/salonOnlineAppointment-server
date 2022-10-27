const db = require('../connection');

const getSchedule = () => {
  return db.query(`
  SELECT schedule.id as id, start_time as start, end_time as end,
    stylists.name as name, week_days.name as day
    FROM schedule
    JOIN stylists ON schedule.stylist_id = stylists.id
    JOIN week_days ON schedule.week_day_id = week_days.id
    ORDER BY stylists.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getSchedule };
