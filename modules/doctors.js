var pool  = require('../lib/db');


// Connect to the PostgreSQL database
pool.connect();

// Function to fetch data from the Doctor table
async function getDoctors() {
  try {
    const result = await pool.query('SELECT * FROM Doctor');
    return result.rows;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

// Function to update data in the Doctor table
async function updateDoctor(doctorId, updates) {
  try {
    const updateQuery = 'UPDATE Doctor SET ' + Object.keys(updates).map(key => `${key} = '${updates[key]}'`).join(', ') + ` WHERE id = ${doctorId}`;
    await pool.query(updateQuery);
    console.log(`Doctor with ID ${doctorId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating doctor with ID ${doctorId}:`, error);
  }
}

// Function to insert new data into the Doctor table
async function insertDoctor(doctorData) {
  try {
    const insertQuery = `INSERT INTO Doctor (${Object.keys(doctorData).join(', ')}) VALUES (${Object.values(doctorData).map(value => `'${value}'`).join(', ')})`;
    await pool.query(insertQuery);
    console.log('New doctor inserted successfully.');
  } catch (error) {
    console.error('Error inserting new doctor:', error);
  }
}

module.exports = {
  getDoctors,
  updateDoctor,
  insertDoctor,
};
