const db = require('../connection');

const getServiceGroups = () => {
  return db.query(`
  SELECT id, service_groups.name as group
    FROM service_groups
    ORDER BY id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getServiceGroups };
