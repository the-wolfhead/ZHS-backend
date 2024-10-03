const pool = require('../lib/db'); // Database connection

// Function to insert a new clinic into the table
async function insertClinic(name, location, bio, rating, clinicType) {
  const query = `INSERT INTO clinics (name, location, bio, rating, clinic_type) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const values = [name, location, bio, rating, clinicType];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting clinic:', error);
    throw error;
  }
}

// Function to update an existing clinic in the table
async function updateClinic(id, name, location, bio, rating, clinicType) {
  const query = `
    UPDATE clinics
    SET name = $2, location = $3, bio = $4, rating = $5, clinic_type = $6
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, name, location, bio, rating, clinicType];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating clinic:', error);
    throw error;
  }
}

// Function to get all clinics from the table
async function getAllClinics() {
  const query = `
    SELECT * FROM clinics;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error getting clinics:', error);
    throw error;
  }
}

// Function to get clinics from the table with optional filters
async function getClinics(filters = {}) {
  let query = 'SELECT * FROM clinics';
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
    console.error('Error getting clinics:', error);
    throw error;
  }
}

// Function to get a clinic by ID
async function getClinicById(id) {
  const query = `
    SELECT * FROM clinics
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

// Export the functions to be used in other modules
module.exports = { insertClinic, updateClinic, getAllClinics, getClinics, getClinicById };
const pool  = require('../lib/db');// Database connection
// Function to insert a new clinic into the table
async function insertClinic(name, location, bio, rating, clinicType) {
    const query = `INSERT INTO clinics (name, location, bio, rating, clinic_type)VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [name, location, bio, rating, clinicType];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error inserting clinic:', error);
      throw error;
    }
  }
  
  // Function to update an existing clinic in the table
  async function updateClinic(id, name, location, bio, rating, clinicType) {
    const query = `
      UPDATE clinics
      SET name = $2, location = $3, bio = $4, rating = $5, clinic_type = $6
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, name, location, bio, rating, clinicType];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating clinic:', error);
      throw error;
    }
  }
  
  // Function to get all clinics from the table
  async function getAllClinics() {
    const query = `
      SELECT * FROM clinics;
    `;
  
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error getting clinics:', error);
      throw error;
    }
  }

  // Function to get clinics from the table with optional filters
async function getClinics(filters = {}) {
    let query = 'SELECT * FROM clinics';
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
      console.error('Error getting clinics:', error);
      throw error;
    }
  }
  
  
  // Export the functions to be used in other modules
  module.exports = { insertClinic, updateClinic, getAllClinics, getClinics };
