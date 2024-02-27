// Import necessary modules
const express = require('express');
const pool  = require('./lib/db');
const {getFavoriteDoctors, getFavoriteLaboratories} = require('./modules/favorites');
const {getDoctors, updateDoctor, insertDoctor,} = require('./modules/doctors');
const {getLabs, updateLab, insertLab,} = require('./modules/labs');
const {getLabTests, updateLabTest, insertLabTest,} = require('./modules/labtest')
const {getConsultations, updateConsultation, insertConsultation,} = require('./modules/consultations');
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

// Route for handling signup POST requests
app.post('/signup', async (req, res) => {
  const { name, dateOfBirth, gender, contactInfo, address, password } = req.body;

  // Validation (you can add more validation as needed)
  if (!name || !dateOfBirth || !gender || !contactInfo || !address || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    // Check if user with the provided contact info already exists
    const existingUserQuery = {
      text: 'SELECT * FROM patient WHERE contact_info = $1',
      values: [contactInfo],
    };
    const existingUserResult = await client.query(existingUserQuery);

    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ error: 'User with this contact info already exists.' });
    }

    // Insert new user into the Patient table
    const insertQuery = {
      text: 'INSERT INTO patient (name, date_of_birth, gender, contact_info, address, password) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [name, dateOfBirth, gender, contactInfo, address, password],
    };
    await client.query(insertQuery);

    // Return success response
    res.status(201).json({ message: 'User signed up successfully.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'An error occurred during signup.' });
  }
});

// Route for handling import request for getDoctors
app.get('/getDoctors', async (req, res) => {
  try {
    // Call the getDoctors function to fetch doctors data
    const doctors = await getDoctors();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// Route for handling import request for getLabs
app.get('/getLabs', async (req, res) => {
  try {
    // Call the getDoctors function to fetch doctors data
    const labs = await getLabs();
    res.json(labs);
  } catch (error) {
    console.error('Error fetching labs:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// Route for handling import request for getDoctors
app.get('/getConsultations', async (req, res) => {
  try {
    // Call the getDoctors function to fetch doctors data
    const consultations = await getConsultations();
    res.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});
// Start the Express server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
