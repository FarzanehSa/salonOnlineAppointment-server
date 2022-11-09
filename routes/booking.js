const express = require('express');
const router  = express.Router();

const {getBookingOptions} = require('../db/queries/05_getBookingOptions');
const {addToSchedule} = require('../db/queries/06_addToSchedule');
const {getAllBookedForDate} = require('../db/queries/07_getAllBookedForDate');

router.post('/', (req, res) => {

  const rec = req.body;
  const wantedStylists = rec.stylists.map(row => row.id)

  const f1 = getBookingOptions(rec.service.groupid, rec.day);
  const f2 = getAllBookedForDate(rec.date);

  Promise.all([f1, f2])
  .then(([options, booked]) => {
    console.log(options);
    if (rec.stylists.length !== 0) {
      options = options.filter(row => wantedStylists.indexOf(Number(row.stylist_id)) !== -1 );
    }
    res.json({ options, booked });
    return;
  })
  .catch(err => {
    console.log(err);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.post('/:time', (req, res) => {

  const time = req.params.time;
  const rec = req.body;
  console.log(rec);
  console.log(time);

  addToSchedule(rec.stylistId, rec.userId, rec.date, time)
  .then(data => {
    console.log('✅','update booking done');
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;
