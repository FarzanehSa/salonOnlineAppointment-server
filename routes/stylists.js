/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const {getAllStylists} = require('../db/queries/01_getAllStylists');
const {getServiceGroups} = require('../db/queries/03_getServiceGroups');
const {getAvailability} = require('../db/queries/02_getAvailability');
const {addStylist} = require('../db/queries/dashboard/employee/01_addStylist');
const {addStylistSkill} = require('../db/queries/dashboard/employee/02_addStylistSkill');
const {deleteStylist} = require('../db/queries/dashboard/employee/03_deleteStylist');
const {deleteSkills} = require('../db/queries/dashboard/employee/04_deleteSkills');
const {updateStylist} = require('../db/queries/dashboard/employee/05_updateStylist');
const {findSkill} = require('../db/queries/dashboard/employee/06_findSkill');
const {deleteOneSkill} = require('../db/queries/dashboard/employee/07_deleteOneSkill');

router.get('/', (req, res) => {

  const f1 = getAllStylists();
  const f2 = getAvailability();

  Promise.all([f1, f2])
  .then(([stylists, availability]) => {
    res.json({ stylists, availability });
    return;
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });;
});

router.post("/", (req, res) => {

  const {name, image, bio, level} = req.body.stylist;
  const skills = req.body.skills;

  addStylist(name.trim(), image, bio.trim(), level)
  .then(newStylist => {
    console.log(newStylist);

    const promiseArr = skills.filter(row => row.select === true).map(row => {
      addStylistSkill(row.id, newStylist.id)
    });

    Promise.all(promiseArr)
    .then(data => {
      getAllStylists()
      .then(stylists => {
        res.json({ stylists });
        return;
      })
    })
  })
  .catch(err => {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  });
});

router.put("/", async(req, res) => {

  const {id, name, image, bio, level} = req.body.stylist;
  const skills = req.body.skills;

  try {
    const f1 = await updateStylist(id, name, image, bio, level);

    const selectedSkills = skills.filter(row => row.select === true);
    const unselectedSkills = skills.filter(row => row.select === false);

    const selectedSkillsLoop = async() => {
      for (const f of selectedSkills) {
        const data = await findSkill(f.id, id)
        if (!data) {
          console.log('✅ Add skill');
          await addStylistSkill(f.id, id)
        }
      }
    }

    const unselectedSkillsLoop = async() => {
      for (const f of unselectedSkills) {
        const data = await findSkill(f.id, id)
        if (data) {
          console.log('❌ Delete skill');
          await deleteOneSkill(f.id, id);
        }
      }
    }

    const f2 = await selectedSkillsLoop();
    const f3 = await unselectedSkillsLoop();
    const stylists = await getAllStylists();

    res.json({ stylists });
    return;
  } catch(err) {
    console.log(err.message);
    res
    .status(500)
    .json({ error: err.message });
  };
});

router.delete("/:id", (req, res) => {

  const id = req.params.id;

  const f1 = deleteStylist(id);
  const f2 = deleteSkills(id);

  Promise.all([f1, f2])
  .then(([deleted, r2]) => {
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
