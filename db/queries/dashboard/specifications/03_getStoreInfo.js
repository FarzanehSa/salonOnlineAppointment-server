const db = require('../../../connection');

const getStoreInfo = (id, date, time) => {
  return db.query(`
  SELECT * FROM store_info;`
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { getStoreInfo };
