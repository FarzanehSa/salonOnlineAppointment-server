const express = require('express');
const router  = express.Router();

const {getBookingOptions} = require('../db/queries/05_getBookingOptions');

router.post('/', (req, res) => {

  const r = req.body;
  console.log(r);

//   function getDayName(dateStr) {
//     var date = new Date(dateStr);
//     console.log(da);
//     return date.toLocaleDateString({ weekday: 'long' });
// }
// console.log(getDayName('05/23/2014'));

  getBookingOptions(r.service.groupid, r.day)
  .then(data => {
    console.log('✅','update inventory done');
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
