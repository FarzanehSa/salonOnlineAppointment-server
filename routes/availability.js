const express = require('express');
const router  = express.Router();

const {getStylistAvailability} = require('../db/queries/dashboard/availability/01_getStylistAvailability');
const {deleteAvailabilities} = require('../db/queries/dashboard/availability/02_deleteAvailabilities');
const {addAvailabilities} = require('../db/queries/dashboard/availability/03_addAvailabilities');

router.get("/:id", (req, res) => {

  const id = req.params.id;

  console.log(id);

  getStylistAvailability(id)
  .then((availability) => {
    res.json({ availability });
    return;
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.post("/:id", async(req, res) => {

  const id = req.params.id;
  const ava = req.body.ava;


  try {
    const deletedData = await deleteAvailabilities(id);
    const validInfo = ava.filter(row => row.start && row.end);
    const promiseArray = validInfo.map(row => {
      return (addAvailabilities(row.dayid, id, row.start, row.end))
    })
    const newData = await Promise.all([...promiseArray]);
    const availability = await getStylistAvailability(id);
    res.json({ availability });
    return;
  } catch (err) {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  };
});

module.exports = router;
