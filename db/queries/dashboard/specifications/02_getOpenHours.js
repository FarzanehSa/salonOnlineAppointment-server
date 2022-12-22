const db = require('../../../connection');

const getOpenHours = () => {
  return db.query(`
  SELECT open_hours.id,
    to_char(open_hours.open_time,'HH24:MI') as open,
    to_char(open_hours.close_time,'HH24:MI') as close,
    week_days.id as dayid,
    week_days.name as day
    FROM open_hours
    JOIN week_days on week_days.id = open_hours.week_day_id
    ORDER BY open_hours.week_day_id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getOpenHours };
