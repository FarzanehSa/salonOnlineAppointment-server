const db = require('../../../connection');

const deleteSkills = (id) => {
  return db.query(`
    DELETE FROM stylist_skills
    WHERE stylist_skills.stylist_id = $1
    RETURNING *;`, [id]
    )
    .then(data => {
      return data.rows[0];
    });
  }

  module.exports = { deleteSkills };
