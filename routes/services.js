const express = require('express');
const router  = express.Router();

const {getServiceGroups} = require('../db/queries/03_getServiceGroups');
const {getServices} = require('../db/queries/04_getServices');

router.get('/', (req, res) => {

  const f1 = getServiceGroups();
  const f2 = getServices();

  Promise.all([f1, f2])
  .then(([groups, services]) => {
    res.json({ groups, services });
    return;
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });;
});

module.exports = router;
