// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const PORT = process.env.PORT || 8000;
const app = express();

// PG database client/connection setup
const { Client } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Client(dbParams);
db.connect();

app.set('view engine', 'ejs');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const stylistsRoutes = require('./routes/stylists');
const serviceGroupsRoutes = require('./routes/service-groups');
const bookingRoutes = require('./routes/booking');
const appointmentsRoutes = require('./routes/appointments');
const servicesRoutes = require('./routes/services');
const availabilityRoutes = require('./routes/availability');
const specRoutes = require('./routes/spec');
const reportsRoutes = require('./routes/reports');

// Mount all resource routes
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/stylists', stylistsRoutes);
app.use('/api/service-groups', serviceGroupsRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/spec', specRoutes);
app.use('/api/reports', reportsRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Salon Online Appointment app listening on port ${PORT}`);
});
