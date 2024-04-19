
const pool  = require('../lib/db');

async function insertDoctor(doctorData) {
  const { name, specialization, qualifications, contact_info, availability, profile_picture_url, rating, certificate_url, license_url, license_expiry_date } = doctorData;
  const queryText = 'INSERT INTO doctor (name, specialization, qualifications, contact_info, availability, profile_picture_url, rating, certificate_url, license_url, license_expiry_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  const values = [name, specialization, qualifications, contact_info, availability, profile_picture_url, rating, certificate_url, license_url, license_expiry_date];
  const { rows } = await db.query(queryText, values);
  return rows[0];
}

async function updateDoctor(doctorId, doctorData) {
  const { name, specialization, qualifications, contact_info, availability, profile_picture_url, rating, certificate_url, license_url, license_expiry_date } = doctorData;
  const queryText = 'UPDATE doctor SET name = $1, specialization = $2, qualifications = $3, contact_info = $4, availability = $5, profile_picture_url = $6, rating = $7, certificate_url = $8, license_url = $9, license_expiry_date = $10 WHERE doctor_id = $11 RETURNING *';
  const values = [name, specialization, qualifications, contact_info, availability, profile_picture_url, rating, certificate_url, license_url, license_expiry_date, doctorId];
  const { rows } = await db.query(queryText, values);
  return rows[0];
}

async function getDoctorById(doctorId) {
  const queryText = 'SELECT * FROM doctor WHERE doctor_id = $1';
  const { rows } = await db.query(queryText, [doctorId]);
  return rows[0];
}

async function getDoctors() {
  try {
    const result = await client.query('SELECT * FROM Doctor');
    return result.rows;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

module.exports = {
  insertDoctor,
  updateDoctor,
  getDoctorById,
  getDoctors,
};