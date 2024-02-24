const pool  = require('../lib/db');


// Connect to the PostgreSQL database
pool.connect();

// Function to fetch data from the LabTest table
async function getLabTests() {
  try {
    const result = await pool.query('SELECT * FROM LabTest');
    return result.rows;
  } catch (error) {
    console.error('Error fetching lab tests:', error);
    return [];
  }
}

// Function to update data in the LabTest table
async function updateLabTest(testId, updates) {
  try {
    const updateQuery = 'UPDATE LabTest SET ' + Object.keys(updates).map(key => `${key} = '${updates[key]}'`).join(', ') + ` WHERE test_id = ${testId}`;
    await pool.query(updateQuery);
    console.log(`Lab test with ID ${testId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating lab test with ID ${testId}:`, error);
  }
}

// Function to insert new data into the LabTest table
async function insertLabTest(testData) {
  try {
    const insertQuery = `INSERT INTO LabTest (${Object.keys(testData).join(', ')}) VALUES (${Object.values(testData).map(value => `'${value}'`).join(', ')})`;
    await pool.query(insertQuery);
    console.log('New lab test inserted successfully.');
  } catch (error) {
    console.error('Error inserting new lab test:', error);
  }
}

module.exports = {
  getLabTests,
  updateLabTest,
  insertLabTest,
};
