var pool  = require('../lib/db');

// Connect to the PostgreSQL database
pool.connect();

// Function to fetch data from the Consultation table
async function getConsultations() {
  try {
    const result = await pool.query('SELECT * FROM Consultation');
    return result.rows;
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return [];
  }
}

// Function to update data in the Consultation table
async function updateConsultation(consultationId, updates) {
  try {
    const updateQuery = 'UPDATE Consultation SET ' + Object.keys(updates).map(key => `${key} = '${updates[key]}'`).join(', ') + ` WHERE consultation_id = ${consultationId}`;
    await pool.query(updateQuery);
    console.log(`Consultation with ID ${consultationId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating consultation with ID ${consultationId}:`, error);
  }
}

// Function to insert new data into the Consultation table
async function insertConsultation(consultationData) {
  try {
    // Check if a consultation already exists for the given doctor and patient at the specified date and start time
    const existingConsultationQuery = {
      text: 'SELECT * FROM Consultation WHERE doctor_id = $1 AND patient_id = $2 AND date = $3 AND start_time = $4',
      values: [consultationData.doctor_id, consultationData.patient_id, consultationData.date, consultationData.start_time],
    };
    const existingConsultationResult = await pool.query(existingConsultationQuery);

    if (existingConsultationResult.rows.length > 0) {
      console.log('Consultation already exists for the given doctor, patient, date, and start time.');
      return;
    }

    // If no existing consultation found, insert the new consultation record
    const insertQuery = `INSERT INTO Consultation (${Object.keys(consultationData).join(', ')}) VALUES (${Object.values(consultationData).map(value => `'${value}'`).join(', ')})`;
    await pool.query(insertQuery);
    console.log('New consultation inserted successfully.');
  } catch (error) {
    console.error('Error inserting new consultation:', error);
  }
}

module.exports = {
  getConsultations,
  updateConsultation,
  insertConsultation,
};
