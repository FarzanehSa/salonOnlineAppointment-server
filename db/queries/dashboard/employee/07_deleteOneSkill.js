const db = require('../../../connection');

const deleteOneSkill = (gId, sId) => {
  return db.query(`
    DELETE FROM stylist_skills
    WHERE stylist_skills.service_group_id = $1 AND stylist_skills.stylist_id = $2
    RETURNING *;`, [gId, sId]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteOneSkill };
