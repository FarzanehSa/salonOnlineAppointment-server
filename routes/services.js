const express = require('express');
const router  = express.Router();

const {getServices} = require('../db/queries/04_getServices');
const {addService} = require('../db/queries/dashboard/service/01_addService');
const {deleteService} = require('../db/queries/dashboard/service/02_deleteService');
const {updateService} = require('../db/queries/dashboard/service/03_updateService');

router.post("/", (req, res) => {

  const {groupId, service, price, description, duration} = req.body;

  addService(groupId, service, Math.trunc(price * 100), description, duration)
  .then(newService => {
    getServices()
    .then(data => {
      res.json({ newServices: data });
      return;
    })
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.put("/", (req, res) => {

  const {id, service, groupId, price, description, duration} = req.body;

  updateService(id, service, groupId, price * 100, description, duration)
  .then(updated => {
    getServices()
    .then(data => {
      res.json({ newServices: data });
      return;
    })
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

  deleteService(id)
  .then(deleted => {

    res.json({ deleted });
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
