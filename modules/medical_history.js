const pool  = require('../lib/db');

async function insertPatient(patientData) {
    const { blood_type, allergies, disabilities, diagnosis, family_history } = patientData;
    const queryText = 'INSERT INTO patient (blood_type, allergies, disabilities, diagnosis, family_history) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [blood_type, allergies, disabilities, diagnosis, family_history];
    const { rows } = await pool.query(queryText, values);
    return rows[0];
  }
  
  async function updatePatient(patientId, patientData) {
    const { blood_type, allergies, disabilities, diagnosis, family_history } = patientData;
    const queryText = 'UPDATE patient SET blood_type = $1, allergies = $2, disabilities = $3, diagnosis = $4, family_history = $5 WHERE patient_id = $6 RETURNING *';
    const values = [blood_type, allergies, disabilities, diagnosis, family_history, patientId];
    const { rows } = await pool.query(queryText, values);
    return rows[0];
  }
  
  async function getPatientById(patientId) {
    const queryText = 'SELECT * FROM patient WHERE patient_id = $1';
    const { rows } = await pool.query(queryText, [patientId]);
    return rows[0];
  }
  
  module.exports = {
    insertPatient,
    updatePatient,
    getPatientById,
  };