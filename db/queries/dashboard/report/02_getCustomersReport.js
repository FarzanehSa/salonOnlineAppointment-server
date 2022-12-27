const db = require('../../../connection');

const getCustomersReport = () => {

  return db.query(`
  SELECT * FROM users;`
    )
    .then(data => {
      return data.rows;
    });


  }

  module.exports = { getCustomersReport };
