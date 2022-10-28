/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const {getAllStylists} = require('../db/queries/01_getAllStylists');
const {getAvailability} = require('../db/queries/02_getAvailability');

router.get('/', (req, res) => {

  const f1 = getAllStylists();
  const f2 = getAvailability();

  Promise.all([f1, f2])
  .then(([stylists, availability]) => {
    res.json({ stylists, availability });
    return;
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });;
});

module.exports = router;
