const express = require('express');
const router  = express.Router();

const {getAllPastAppointmentsByUser} = require('../db/queries/10_getAllPastAppointmentsByUser');
const {getAllComingAppointmentsByUser} = require('../db/queries/11_getAllComingAppointmentsByUser');
const {deleteAppointent} = require('../db/queries/12_deleteAppointent');

router.get("/:id", (req, res) => {

  const userId = req.params.id;
  const date = req.query.date;
  const time = req.query.time;
  const myStatus = req.query.status;

  console.log(date, time);

  const f1 = getAllPastAppointmentsByUser(userId, date, time);
  const f2 = getAllComingAppointmentsByUser(userId, date, time);


  Promise.all([f1, f2])
  .then(([pastApp, comingApp]) => {

    if (myStatus === 'past') {
      res.json({ apps: pastApp });
      return;
    } else if (myStatus === 'coming') {
      res.json({ apps: comingApp });
      return;
    }
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.delete("/:id", (req, res) => {

  const id = req.params.id;

  deleteAppointent(id)
  .then(deletedApp => {

    res.json({ deletedApp });
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
