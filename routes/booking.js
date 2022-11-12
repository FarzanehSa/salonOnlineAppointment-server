const express = require('express');
const router  = express.Router();

const {getBookingOptions} = require('../db/queries/05_getBookingOptions');
const {addToSchedule} = require('../db/queries/06_addToSchedule');
const {getAllBookedForDate} = require('../db/queries/07_getAllBookedForDate');

router.post('/', async(req, res) => {

  const rec = req.body;
  console.log(req.body.reqApps);
  const wantedStylistsArray = rec.reqApps.map(row => {
    const ids = row.stylists.map(stylist => stylist.id)
    return ids;
  });

  console.log('👀', wantedStylistsArray);

  const promiseArray = [];

  for (const line of rec.reqApps) {
    promiseArray.push(getBookingOptions(line.service.groupid, rec.day, line.service.id))
  }
  const bookingOptionArray = await Promise.all(promiseArray);
  console.log(bookingOptionArray);

  const options = bookingOptionArray.map((row, index) => {
    if (wantedStylistsArray[index].length !== 0) {
      return row.filter(st => wantedStylistsArray[index].indexOf(Number(st.stylist_id)) !== -1 );
    } else {
      return row;
    }
  })

  console.log('🇨🇦',options);

  const booked = await getAllBookedForDate(rec.reqApps[0].date);
  console.log(booked);

  res.json({ options, booked });

  // const f1 = getBookingOptions(rec.service.groupid, rec.day);


  // Promise.all(promiseArray)
  // .then((result) => {
  //   console.log(result);
  //   // if (rec.stylists.length !== 0) {
  //   //   options = options.filter(row => wantedStylists.indexOf(Number(row.stylist_id)) !== -1 );
  //   // }
  //   // res.json({ options, booked });
  //   // return;
  // })
  // .catch(err => {
  //   console.log(err);
  //   res
  //   .status(500)
  //   .json({ error: err.message });
  // });
  // Promise.all([f1, f2])
  // .then(([options, booked]) => {
  //   console.log(options);
  //   if (rec.stylists.length !== 0) {
  //     options = options.filter(row => wantedStylists.indexOf(Number(row.stylist_id)) !== -1 );
  //   }
  //   res.json({ options, booked });
  //   return;
  // })
  // .catch(err => {
  //   console.log(err);
  //   res
  //   .status(500)
  //   .json({ error: err.message });
  // });
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
