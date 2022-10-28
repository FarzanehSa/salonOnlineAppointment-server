const db = require('../connection');

const getServices = () => {
  return db.query(`
  SELECT services.id, services.name as service, services.price, services.description,
    service_groups.name as group
    FROM services
    JOIN service_groups ON services.service_group_id = service_groups.id
    ORDER BY service_groups.id, services.id;`
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getServices };
