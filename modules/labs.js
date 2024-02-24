const pool  = require('../lib/db');


// Connect to the PostgreSQL database
pool.connect();

// Function to fetch data from the Lab table
async function getLabs() {
  try {
    const result = await pool.query('SELECT * FROM Lab');
    return result.rows;
  } catch (error) {
    console.error('Error fetching labs:', error);
    return [];
  }
}

// Function to update data in the Lab table
async function updateLab(labId, updates) {
  try {
    const updateQuery = 'UPDATE Lab SET ' + Object.keys(updates).map(key => `${key} = '${updates[key]}'`).join(', ') + ` WHERE id = ${labId}`;
    await pool.query(updateQuery);
    console.log(`Lab with ID ${labId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating lab with ID ${labId}:`, error);
  }
}

// Function to insert new data into the Lab table
async function insertLab(labData) {
  try {
    const insertQuery = `INSERT INTO Lab (${Object.keys(labData).join(', ')}) VALUES (${Object.values(labData).map(value => `'${value}'`).join(', ')})`;
    await pool.query(insertQuery);
    console.log('New lab inserted successfully.');
  } catch (error) {
    console.error('Error inserting new lab:', error);
  }
}

module.exports = {
  getLabs,
  updateLab,
  insertLab,
};
