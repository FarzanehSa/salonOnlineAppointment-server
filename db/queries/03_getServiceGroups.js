const db = require('../connection');

const getServiceGroups = () => {
  return db.query(`
  SELECT service_groups.id, service_groups.name as group,
    array_agg(stylist_skills.stylist_id) as stylists
    FROM service_groups
    LEFT JOIN stylist_skills ON stylist_skills.service_group_id = service_groups.id
    WHERE service_groups.active IS true
    GROUP By service_groups.id
    ORDER BY service_groups.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getServiceGroups };
