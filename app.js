// Import necessary modules
const express = require('express');
var pool  = require('../lib/db');

// Create an Express application
const app = express();
const port = 3000;
const hostname = '0.0.0.0';



// Define the lab search endpoint
app.get('/labs', async (req, res) => {
  try {
    const { name, location, test } = req.query;
    let queryParams = [];
    let conditions = [];
    
    if (name) {
      conditions.push('lab_name ILIKE $' + (queryParams.length + 1));
      queryParams.push(`%${name}%`);
    }
    if (location) {
      conditions.push('location ILIKE $' + (queryParams.length + 1));
      queryParams.push(`%${location}%`);
    }
    if (test) {
      conditions.push('test_name ILIKE $' + (queryParams.length + 1));
      queryParams.push(`%${test}%`);
    }

    const query = `
      SELECT lab_id, lab_name, location, contact_info
      FROM Lab
      JOIN Lab_Test ON Lab.lab_id = Lab_Test.lab_id
      JOIN Test ON Lab_Test.test_id = Test.test_id
      ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}
    `;

    const { rows } = await pool.query(query, queryParams);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// Start the Express server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
