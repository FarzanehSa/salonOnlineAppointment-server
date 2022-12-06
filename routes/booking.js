const express = require('express');
const router  = express.Router();

const {getBookingOptions} = require('../db/queries/05_getBookingOptions');
const {addToSchedule} = require('../db/queries/06_addToSchedule');
const {getAllBookedForDate} = require('../db/queries/07_getAllBookedForDate');

router.post('/', async(req, res) => {

  const bookingReqs = req.body.bookingReqs;
  const day = req.body.day;
  const date = req.body.date;

  console.log('🇨🇦 date \n', date, '\n',day, '\n', bookingReqs);

  const wantedStylistsArray = bookingReqs.map(row => {
    const ids = row.stylists.map(stylist => stylist.id)
    return ids;
  });

  // console.log('👀', wantedStylistsArray);

  const promiseArray = [];

  for (const line of bookingReqs) {
    promiseArray.push(getBookingOptions(line.service.groupid, day, line.service.id))
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

  const booked = await getAllBookedForDate(date);
  console.log('🇨🇦🇨🇦 booked \n',booked);

  res.json({ options, booked, date});
});

router.post('/save', async(req, res) => {

  const schedule = req.body.tasks.stylists;
  const date = req.body.tasks.date;

  const user = req.body.user;
  console.log('⛑ schedule \n', schedule);
  console.log('⛑ date \n', date);
  console.log('👩🏻‍⚖️ User \n', user);


  const promiseArray = [];

  for (let i = 0; i < schedule.length; i++) {
    promiseArray.push(addToSchedule(schedule[i].stylistId, schedule[i].serviceId, user.id, date, schedule[i].startTime, schedule[i].endTime))
  }
  const savedData = await Promise.all(promiseArray);
  console.log('✅','update booking done');
  res.json({savedData, date});
});

module.exports = router;
