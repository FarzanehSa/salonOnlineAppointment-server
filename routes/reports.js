/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const {getAppointmentsReport} = require('../db/queries/dashboard/report/01_getAppointmentsReport');
const {getCustomersReport} = require('../db/queries/dashboard/report/02_getCustomersReport');


router.get('/appointments', (req, res) => {

  const { stylist, service, date, dateAfter } = req.query;
  // console.log(stylist, service, date, dateAfter);

  const newD = date ? date : dateAfter;
  const exactReq = date ? true : false;

  getAppointmentsReport(stylist, service, newD, exactReq)
  .then(result => {
    res.json({ result });
    return;
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });;
});

router.get('/customers', (req, res) => {

  getCustomersReport()
  .then(result => {
    res.json({ result });
    return;
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });;
});

module.exports = router;
