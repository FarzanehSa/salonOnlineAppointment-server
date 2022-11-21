const express = require('express');
const router  = express.Router();

const {getBookingOptions} = require('../db/queries/05_getBookingOptions');
const {addToSchedule} = require('../db/queries/06_addToSchedule');
const {getAllBookedForDate} = require('../db/queries/07_getAllBookedForDate');

router.post('/', async(req, res) => {

  const rec = req.body;
  console.log(req.body);
  console.log(req.body.day);
  const wantedStylistsArray = rec.reqApps.map(row => {
    const ids = row.stylists.map(stylist => stylist.id)
    return ids;
  });

  // console.log('👀', wantedStylistsArray);

  const promiseArray = [];

  for (const line of rec.reqApps) {
    promiseArray.push(getBookingOptions(line.service.groupid, rec.day, line.service.id))
  }
  const bookingOptionArray = await Promise.all(promiseArray);
  // console.log(bookingOptionArray);

  const options = bookingOptionArray.map((row, index) => {
    if (wantedStylistsArray[index].length !== 0) {
      return row.filter(st => wantedStylistsArray[index].indexOf(Number(st.stylist_id)) !== -1 );
    } else {
      return row;
    }
  })

  console.log('🇨🇦 options \n',options);

  const booked = await getAllBookedForDate(rec.reqApps[0].date);
  console.log('🇨🇦🇨🇦 booked \n',booked);

  res.json({ options, booked, date: rec.reqApps[0].date});
});

router.post('/:time', (req, res) => {

  const sTime = req.params.time;
  const rec = req.body;
  // console.log(rec);
  // console.log(sTime);
  const eTime = new Date(new Date("1970/01/01 " + sTime).getTime() + rec.duration * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });

  addToSchedule(rec.stylistId, rec.userId, rec.date, sTime, eTime)
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
