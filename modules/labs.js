const pool  = require('../lib/db');


// Connect to the PostgreSQL database
pool.connect();

// Function to fetch data from the Lab table
async function getLabs() {
  try {
    const result = await pool.query('SELECT * FROM labs');
    return result.rows;
  } catch (error) {
    console.error('Error fetching labs:', error);
    return [];
  }
}

// Function to update data in the Lab table
async function updateLab(labId, updates) {
  try {
    const updateQuery = 'UPDATE labs SET ' + Object.keys(updates).map(key => `${key} = '${updates[key]}'`).join(', ') + ` WHERE id = ${labId}`;
    await pool.query(updateQuery);
    console.log(`Lab with ID ${labId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating lab with ID ${labId}:`, error);
  }
}

// Function to insert new data into the Lab table
async function insertLab(labData) {
  try {
    const insertQuery = `INSERT INTO labs (${Object.keys(labData).join(', ')}) VALUES (${Object.values(labData).map(value => `'${value}'`).join(', ')})`;
    await pool.query(insertQuery);
    console.log('New lab inserted successfully.');
  } catch (error) {
    console.error('Error inserting new lab:', error);
  }
}

// Function to get labs from the table with optional filters
async function getlabs(filters = {}) {
  let query = 'SELECT * FROM labs';
  const values = [];
  const whereClauses = [];

  // Construct WHERE clauses based on filter parameters
  if (filters.name) {
    whereClauses.push('name = $' + (values.push(filters.name)));
  }
  if (filters.location) {
    whereClauses.push('location = $' + (values.push(filters.location)));
  }
  if (filters.clinicType) {
    whereClauses.push('clinic_type = $' + (values.push(filters.clinicType)));
  }

  // Append WHERE clauses to the query if any filters were provided
  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error getting labs:', error);
    throw error;
  }
}

// Function to get a clinic by ID
async function getLabById(id) {
  const query = `
    SELECT * FROM labs
    WHERE id = $1;
  `;
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the clinic data or null if not found
  } catch (error) {
    console.error('Error getting clinic by ID:', error);
    throw error;
  }
}

module.exports = {
  getLabs,
  getLabById,
  updateLab,
  insertLab,
};
