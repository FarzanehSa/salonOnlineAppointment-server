const db = require('../connection');

const getBookingOptions = (groupId, dayName, serviceId) => {
  return db.query(`
  SELECT stylists_availability.stylist_id,
  stylists.name as stylist, stylists.image,
  stylist_levels.name as level,
  to_char(stylists_availability.start_time,'HH24:MI') as start,
  to_char(stylists_availability.end_time,'HH24:MI') as end,
  services.name as service, services.id as serviceid,
  services.duration
    FROM stylists_availability
    JOIN stylists ON stylists.id = stylists_availability.stylist_id
    JOIN stylist_skills ON stylist_skills.stylist_id = stylists_availability.stylist_id
    JOIN week_days ON week_days.id = stylists_availability.week_day_id
    JOIN stylist_levels ON stylist_levels.id = stylists.stylist_level_id
    JOIN services ON stylist_skills.service_group_id = services.service_group_id
    WHERE stylist_skills.service_group_id = $1 AND week_days.name = $2 AND services.id = $3 AND stylists.active IS true
    ;`, [groupId, dayName, serviceId]
  )
    .then(data => {
      return data.rows;
    });
}

module.exports = { getBookingOptions };
