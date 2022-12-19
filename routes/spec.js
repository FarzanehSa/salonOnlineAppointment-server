const express = require('express');
const router  = express.Router();

const {getLevels} = require('../db/queries/dashboard/specifications/01_getLevels');

router.get("/levels", (req, res) => {

  getLevels()
  .then(levels => {
    res.json({ levels });
    return;
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;
