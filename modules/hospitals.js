const pool  = require('../lib/db');

// Function to fetch data from the Hospitals table
async function getHospitalss() {
  try {
    const result = await pool.query('SELECT * FROM Hospitals');
    return result.rows;
  } catch (error) {
    console.error('Error fetching Hospitalss:', error);
    return [];
  }
}

// Function to update data in the Hospitals table
async function updateHospitals(HospitalsId, updates) {
  try {
    const updateQuery = 'UPDATE Hospitals SET ' + Object.keys(updates).map(key => `${key} = '${updates[key]}'`).join(', ') + ` WHERE id = ${HospitalsId}`;
    await pool.query(updateQuery);
    console.log(`Hospitals with ID ${HospitalsId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating Hospitals with ID ${HospitalsId}:`, error);
  }
}

// Function to insert new data into the Hospitals table
async function insertHospitals(HospitalsData) {
  try {
    const insertQuery = `INSERT INTO Hospitals (${Object.keys(HospitalsData).join(', ')}) VALUES (${Object.values(HospitalsData).map(value => `'${value}'`).join(', ')})`;
    await pool.query(insertQuery);
    console.log('New Hospitals inserted successfully.');
  } catch (error) {
    console.error('Error inserting new Hospital:', error);
  }
}

module.exports = {
  getHospitals,
  updateHospitals,
  insertHospitals,
};
