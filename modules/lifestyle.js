// lifestyle.js - Module for CRUD operations on the lifestyle table

const pool  = require('../lib/db');

async function insertLifestyle(patientId, lifestyleData) {
  const { smoking_status, smoking_frequency, drinking_status, drinking_frequency, exercise_status, exercise_frequency } = lifestyleData;
  const queryText = 'INSERT INTO lifestyle (patient_id, smoking_status, smoking_frequency, drinking_status, drinking_frequency, exercise_status, exercise_frequency) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [patientId, smoking_status, smoking_frequency, drinking_status, drinking_frequency, exercise_status, exercise_frequency];
  const { rows } = await db.query(queryText, values);
  return rows[0];
}

async function updateLifestyle(patientId, lifestyleData) {
  const { smoking_status, smoking_frequency, drinking_status, drinking_frequency, exercise_status, exercise_frequency } = lifestyleData;
  const queryText = 'UPDATE lifestyle SET smoking_status = $2, smoking_frequency = $3, drinking_status = $4, drinking_frequency = $5, exercise_status = $6, exercise_frequency = $7 WHERE patient_id = $1 RETURNING *';
  const values = [patientId, smoking_status, smoking_frequency, drinking_status, drinking_frequency, exercise_status, exercise_frequency];
  const { rows } = await db.query(queryText, values);
  return rows[0];
}

async function getLifestyleByPatientId(patientId) {
  const queryText = 'SELECT * FROM lifestyle WHERE patient_id = $1';
  const { rows } = await db.query(queryText, [patientId]);
  return rows[0];
}

module.exports = {
  insertLifestyle,
  updateLifestyle,
  getLifestyleByPatientId,
};
