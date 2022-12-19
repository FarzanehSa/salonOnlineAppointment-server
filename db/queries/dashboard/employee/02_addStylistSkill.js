const db = require('../../../connection');

const addStylistSkill = (gId, sId) => {
  return db.query(`
    INSERT INTO stylist_skills (service_group_id, stylist_id)
    VALUES ($1, $2)
    RETURNING *;`, [gId, sId]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { addStylistSkill };
