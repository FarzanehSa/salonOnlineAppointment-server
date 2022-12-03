const db = require('../connection');

const addCustomer = (firstname, lastname, tel, email, password) => {
  return db.query(`
  INSERT INTO users
  (firstname, lastname, tel, email, password, access)
  VALUES ($1, $2, $3, $4, $5, 2)
  RETURNING * ;`, [firstname, lastname, tel, email, password]
  )
    .then(data => {
      return data.rows[0];
    });
}

module.exports = { addCustomer };
