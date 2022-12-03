const db = require('../connection');

const findUser = (email) => {
  return db.query(`
  SELECT *
    FROM users
    WHERE users.email = $1;`, [email]
  )
    .then(data => {
      return data.rows[0];
    });
}

module.exports = { findUser };
