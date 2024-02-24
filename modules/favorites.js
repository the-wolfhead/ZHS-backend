const pool  = require('../lib/db');

// Connect to the PostgreSQL database
pool.connect();

// Query to retrieve favorite doctors data
const getFavoriteDoctorsQuery = `
  SELECT Patient.name AS patient_name, Doctor.name AS doctor_name
  FROM FavoriteDoctors
  INNER JOIN Patient ON FavoriteDoctors.patient_id = Patient.id
  INNER JOIN Doctor ON FavoriteDoctors.doctor_id = Doctor.id;
`;

// Query to retrieve favorite laboratories data
const getFavoriteLaboratoriesQuery = `
  SELECT Patient.name AS patient_name, Laboratory.name AS laboratory_name
  FROM FavoriteLaboratories
  INNER JOIN Patient ON FavoriteLaboratories.patient_id = Patient.id
  INNER JOIN Laboratory ON FavoriteLaboratories.laboratory_id = Laboratory.id;
`;

// Function to fetch favorite doctors data
async function getFavoriteDoctors() {
  try {
    const result = await pool.query(getFavoriteDoctorsQuery);
    return result.rows;
  } catch (error) {
    console.error('Error fetching favorite doctors:', error);
    return [];
  }
}

// Function to fetch favorite laboratories data
async function getFavoriteLaboratories() {
  try {
    const result = await pool.query(getFavoriteLaboratoriesQuery);
    return result.rows;
  } catch (error) {
    console.error('Error fetching favorite laboratories:', error);
    return [];
  }
}

module.exports = {
  getFavoriteDoctors,
  getFavoriteLaboratories,
};
