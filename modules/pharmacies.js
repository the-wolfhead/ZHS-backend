const pool  = require('../lib/db');

async function insertPharmacy(pharmacyData) {
    const { name, location, phone_number, email, website, opening_hours, profile_picture_url, rating } = pharmacyData;
    const queryText = 'INSERT INTO pharmacies (name, location, phone_number, email, website, opening_hours, profile_picture_url, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [name, location, phone_number, email, website, opening_hours, profile_picture_url, rating];
    const { rows } = await pool.query(queryText, values);
    return rows[0];
  }
  
  async function updatePharmacy(pharmacyId, pharmacyData) {
    const { name, location, phone_number, email, website, opening_hours, profile_picture_url, rating } = pharmacyData;
    const queryText = 'UPDATE pharmacies SET name = $1, location = $2, phone_number = $3, email = $4, website = $5, opening_hours = $6, profile_picture_url = $7, rating = $8 WHERE id = $9 RETURNING *';
    const values = [name, location, phone_number, email, website, opening_hours, profile_picture_url, rating, pharmacyId];
    const { rows } = await pool.query(queryText, values);
    return rows[0];
  }
  
  async function getPharmacyById(pharmacyId) {
    const queryText = 'SELECT * FROM pharmacies WHERE id = $1';
    const { rows } = await pool.query(queryText, [pharmacyId]);
    return rows[0];
  }
  
  module.exports = {
    insertPharmacy,
    updatePharmacy,
    getPharmacyById,
  };
