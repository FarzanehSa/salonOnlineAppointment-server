const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');

const {addCustomer} = require('../db/queries/08_addCustomer');
const {findUser} = require('../db/queries/09_findUser');

router.post('/', async(req, res) => {

  const info = req.body.info;
  // console.log('🦊 info \n', info);
  const salt = bcrypt.genSaltSync(10);

  findUser(info.email)
  .then(data => {
    if (data) {
      res.json({ errorCode: 1, errorMsg: 'duplicate email' });
      return;
    } else {
      const hashPassword = bcrypt.hashSync(info.password, salt);
      const f1 = addCustomer(info.firstname, info.lastname, info.tel, info.email, hashPassword);

      Promise.all([f1])
      .then(([user]) => {
        res.json({ user });
        return;
      })
      .catch(err => {
        console.log(err.message)
        res
        .status(500)
        .json({ error: err.message });

      });
    }
  })
});

module.exports = router;
