const db = require('../connection');

const getAllTimes = () => {
  return db.query(`
  SELECT times.id, to_char(times.time,'HH24:MI') as time, times.name
    FROM times
    ORDER BY times.time;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getAllTimes };
