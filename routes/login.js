const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');

const {findUser} = require('../db/queries/09_findUser');

router.post('/', async(req, res) => {

  const info = req.body.info;
  // console.log('🦊 info \n', info);

  findUser(info.email)
  .then(data => {
    if (!data) {
      res.json({ errorCode: 1, errorMsg: 'email or password is not correct' });
      return;
    } else {
      if (!bcrypt.compareSync(info.password, data.password)) {
        res.json({ errorCode: 1, errorMsg: 'email or password is not correct' });
        return;
      } else {
        res.json({ user: data });
        return;
      }
    }
  })
  .catch(err => {
    console.log(err.message)
    res
    .status(500)
    .json({ error: err.message })
  });
});

module.exports = router;
