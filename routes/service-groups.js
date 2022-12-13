const express = require('express');
const router  = express.Router();

const {getAllTimes} = require('../db/queries/00_getAllTimes');
const {getServiceGroups} = require('../db/queries/03_getServiceGroups');
const {getServices} = require('../db/queries/04_getServices');
const {addServiceGroup} = require('../db/queries/dashboard/serviceGroup/01_addServiceGroup');
const {deleteServiceGroup} = require('../db/queries/dashboard/serviceGroup/02_deleteServiceGroup');
const {updateServiceGroup} = require('../db/queries/dashboard/serviceGroup/03_updateServiceGroup');

router.get('/', (req, res) => {

  const f1 = getServiceGroups();
  const f2 = getServices();
  const f3 = getAllTimes();

  Promise.all([f1, f2, f3])
  .then(([groups, services, timeTable]) => {
    res.json({ groups, services, timeTable});
    return;
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });;
});

router.delete("/:id", (req, res) => {

  const id = req.params.id;

  deleteServiceGroup(id)
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

router.put("/", (req, res) => {

  const {id, serviceGroup} = req.body.group;

  updateServiceGroup(id, serviceGroup.trim())
  .then(updated => {
    res.json({ updated });
    return;
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.post("/", (req, res) => {

  const serviceGroup = req.body.group.serviceGroup.trim();

  addServiceGroup(serviceGroup)
  .then(newGroup => {
    getServiceGroups()
    .then(updateGroups => {
      res.json({ updateGroups });
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

module.exports = router;
