const db = require('../../../connection');

const getLevels = () => {
  return db.query(`
  SELECT *
    FROM stylist_levels
    ORDER BY id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getLevels };
