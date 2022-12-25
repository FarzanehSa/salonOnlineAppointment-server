const express = require('express');
const router  = express.Router();

const {getLevels} = require('../db/queries/dashboard/specifications/01_getLevels');
const {getOpenHours} = require('../db/queries/dashboard/specifications/02_getOpenHours');
const {getStoreInfo} = require('../db/queries/dashboard/specifications/03_getStoreInfo');

router.get("/levels", (req, res) => {

  getLevels()
  .then(levels => {
    res.json({ levels });
    return;
  })
  .catch(err => {
    // console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.get("/open-hours", (req, res) => {

  getOpenHours()
  .then(openHours => {
    res.json({ openHours });
    return;
  })
  .catch(err => {
    // console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.get("/storeinfo", (req, res) => {

  getStoreInfo()
  .then(storeInfo => {
    res.json({ storeInfo });
    return;
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;
