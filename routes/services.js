const express = require('express');
const router  = express.Router();

const {addService} = require('../db/queries/dashboard/service/01_addService');

// router.get('/', (req, res) => {

//   const f1 = getServiceGroups();
//   const f2 = getServices();

//   Promise.all([f1, f2])
//   .then(([groups, services]) => {
//     res.json({ groups, services });
//     return;
//   })
//   .catch(err => {
//     res
//     .status(500)
//     .json({ error: err.message });
//   });;
// });

// router.delete("/:id", (req, res) => {

//   const id = req.params.id;

//   deleteServiceGroup(id)
//   .then(deleted => {

//     res.json({ deleted });
//     return;

//   })
//   .catch(err => {
//     console.log(err.message);
//     res
//     .status(500)
//     .json({ error: err.message });
//   });
// });

// router.put("/", (req, res) => {

//   const {id, serviceGroup} = req.body.group;

//   updateServiceGroup(id, serviceGroup.trim())
//   .then(updated => {
//     res.json({ updated });
//     return;
//   })
//   .catch(err => {
//     console.log(err.message);
//     res
//     .status(500)
//     .json({ error: err.message });
//   });
// });

router.post("/", (req, res) => {

  const {groupId, service, price, description, duration} = req.body;


  addService(groupId, service, Math.trunc(price * 100), description, duration)
  .then(newService => {
    res.json({ newService });
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
