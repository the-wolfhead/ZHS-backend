// Import necessary modules
const express = require('express');
const pool  = require('./lib/db');
const {getFavoriteDoctors, getFavoriteLaboratories} = require('./modules/favorites');
const {getDoctors, updateDoctor, insertDoctor,} = require('./modules/doctors');
const {getLabs, updateLab, insertLab,} = require('./modules/labs');
const { insertLifestyle,updateLifestyle,getLifestyleByPatientId,}= require('./modules/lifestyle');
const { insertPatient, updatePatient, getPatientById,} = require ('./modules/medical_history');
const {getConsultations, updateConsultation, insertConsultation,} = require('./modules/consultations');
const {getClinics, updateClinic, insertClinic, getAllClinics, } = require('./modules/clinics');
const { insertPharmacy, updatePharmacy, getPharmacyById,} = require('./modules/pharmacies');
// Create an Express application
const app = express();
const port = 3000;
const hostname = '0.0.0.0';





const router = express.Router();

// Handler for getting all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await getDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error getting doctors:', error);
    res.status(500).json({ error: 'Failed to get doctors' });
  }
});

// Handler for updating a doctor
router.put('/doctors/:id', async (req, res) => {
  const doctorId = req.params.id;
  const updates = req.body;
  try {
    await updateDoctor(doctorId, updates);
    res.status(200).json({ message: `Doctor with ID ${doctorId} updated successfully` });
  } catch (error) {
    console.error(`Error updating doctor with ID ${doctorId}:`, error);
    res.status(500).json({ error: `Failed to update doctor with ID ${doctorId}` });
  }
});

// Handler for inserting a new doctor
router.post('/doctors', async (req, res) => {
  const doctorData = req.body;
  try {
    await insertDoctor(doctorData);
    res.status(201).json({ message: 'New doctor inserted successfully' });
  } catch (error) {
    console.error('Error inserting new doctor:', error);
    res.status(500).json({ error: 'Failed to insert new doctor' });
  }
});


// Handler for getting all labs
router.get('/labs', async (req, res) => {
  try {
    const labs = await getLabs();
    res.status(200).json(labs);
  } catch (error) {
    console.error('Error getting labs:', error);
    res.status(500).json({ error: 'Failed to get labs' });
  }
});

// Handler for updating a lab
router.put('/labs/:id', async (req, res) => {
  const labId = req.params.id;
  const updates = req.body;
  try {
    await updateLab(labId, updates);
    res.status(200).json({ message: `Lab with ID ${labId} updated successfully` });
  } catch (error) {
    console.error(`Error updating lab with ID ${labId}:`, error);
    res.status(500).json({ error: `Failed to update lab with ID ${labId}` });
  }
});

// Handler for inserting a new lab
router.post('/labs', async (req, res) => {
  const labData = req.body;
  try {
    await insertLab(labData);
    res.status(201).json({ message: 'New lab inserted successfully' });
  } catch (error) {
    console.error('Error inserting new lab:', error);
    res.status(500).json({ error: 'Failed to insert new lab' });
  }
});

// Handler for inserting a new consultation
router.post('/consultations', async (req, res) => {
  const consultationData = req.body;
  try {
    await insertConsultation(consultationData);
    res.status(201).json({ message: 'New consultation inserted successfully' });
  } catch (error) {
    console.error('Error inserting new consultation:', error);
    res.status(500).json({ error: 'Failed to insert new consultation' });
  }
});

// Handler for updating a consultation by ID
router.put('/consultations/:id', async (req, res) => {
  const consultationId = req.params.id;
  const updates = req.body;
  try {
    await updateConsultation(consultationId, updates);
    res.status(200).json({ message: `Consultation with ID ${consultationId} updated successfully` });
  } catch (error) {
    console.error(`Error updating consultation with ID ${consultationId}:`, error);
    res.status(500).json({ error: `Failed to update consultation with ID ${consultationId}` });
  }
});

// Handler for getting all consultations
router.get('/consultations', async (req, res) => {
  try {
    const consultations = await getConsultations();
    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: 'Failed to fetch consultations' });
  }
});


// Handler for inserting a new clinic
router.post('/clinics', async (req, res) => {
  const { name, location, bio, rating, clinicType } = req.body;
  try {
    const newClinic = await insertClinic(name, location, bio, rating, clinicType);
    res.status(201).json(newClinic);
  } catch (error) {
    console.error('Error inserting clinic:', error);
    res.status(500).json({ error: 'Failed to insert clinic' });
  }
});

// Handler for updating an existing clinic
router.put('/clinics/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location, bio, rating, clinicType } = req.body;
  try {
    const updatedClinic = await updateClinic(id, name, location, bio, rating, clinicType);
    res.status(200).json(updatedClinic);
  } catch (error) {
    console.error('Error updating clinic:', error);
    res.status(500).json({ error: 'Failed to update clinic' });
  }
});

// Handler for getting all clinics
router.get('/clinics', async (req, res) => {
  try {
    const clinics = await getAllClinics();
    res.status(200).json(clinics);
  } catch (error) {
    console.error('Error getting clinics:', error);
    res.status(500).json({ error: 'Failed to get clinics' });
  }
});

// Handler for getting clinics with optional filters
router.get('/clinics/search', async (req, res) => {
  const filters = req.query;
  try {
    const filteredClinics = await getClinics(filters);
    res.status(200).json(filteredClinics);
  } catch (error) {
    console.error('Error getting filtered clinics:', error);
    res.status(500).json({ error: 'Failed to get filtered clinics' });
  }
});

// Handler for inserting a new patient
router.post('/patientsmedicals', async (req, res) => {
  const patientData = req.body;
  try {
    const patient = await insertPatient(patientData);
    res.status(201).json(patient);
  } catch (error) {
    console.error('Error inserting new patient:', error);
    res.status(500).json({ error: 'Failed to insert new patient' });
  }
});

// Handler for updating a patient by ID
router.put('/patientsmedicals/:id', async (req, res) => {
  const patientId = req.params.id;
  const patientData = req.body;
  try {
    const updatedPatient = await updatePatient(patientId, patientData);
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error(`Error updating patient with ID ${patientId}:`, error);
    res.status(500).json({ error: `Failed to update patient with ID ${patientId}` });
  }
});

// Handler for getting a patient by ID
router.get('/patientsmedicals/:id', async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await getPatientById(patientId);
    if (!patient) {
      res.status(404).json({ error: `Patient with ID ${patientId} not found` });
    } else {
      res.status(200).json(patient);
    }
  } catch (error) {
    console.error(`Error getting patient with ID ${patientId}:`, error);
    res.status(500).json({ error: `Failed to get patient with ID ${patientId}` });
  }
});

// Handler for inserting a new pharmacy
router.post('/pharmacies', async (req, res) => {
  const pharmacyData = req.body;
  try {
    const newPharmacy = await insertPharmacy(pharmacyData);
    res.status(201).json(newPharmacy);
  } catch (error) {
    console.error('Error inserting new pharmacy:', error);
    res.status(500).json({ error: 'Failed to insert new pharmacy' });
  }
});

// Handler for updating a pharmacy by ID
router.put('/pharmacies/:id', async (req, res) => {
  const pharmacyId = req.params.id;
  const updates = req.body;
  try {
    const updatedPharmacy = await updatePharmacy(pharmacyId, updates);
    res.status(200).json(updatedPharmacy);
  } catch (error) {
    console.error(`Error updating pharmacy with ID ${pharmacyId}:`, error);
    res.status(500).json({ error: `Failed to update pharmacy with ID ${pharmacyId}` });
  }
});

// Handler for getting a pharmacy by ID
router.get('/pharmacies/:id', async (req, res) => {
  const pharmacyId = req.params.id;
  try {
    const pharmacy = await getPharmacyById(pharmacyId);
    if (!pharmacy) {
      res.status(404).json({ error: `Pharmacy with ID ${pharmacyId} not found` });
    } else {
      res.status(200).json(pharmacy);
    }
  } catch (error) {
    console.error(`Error fetching pharmacy with ID ${pharmacyId}:`, error);
    res.status(500).json({ error: `Failed to fetch pharmacy with ID ${pharmacyId}` });
  }
});

// Handler for inserting lifestyle data for a patient
router.post('/patients/:id/lifestyle', async (req, res) => {
  const patientId = req.params.id;
  const lifestyleData = req.body;
  try {
    const newLifestyle = await insertLifestyle(patientId, lifestyleData);
    res.status(201).json(newLifestyle);
  } catch (error) {
    console.error('Error inserting lifestyle data:', error);
    res.status(500).json({ error: 'Failed to insert lifestyle data' });
  }
});

// Handler for updating lifestyle data for a patient
router.put('/patients/:id/lifestyle', async (req, res) => {
  const patientId = req.params.id;
  const lifestyleData = req.body;
  try {
    const updatedLifestyle = await updateLifestyle(patientId, lifestyleData);
    res.status(200).json(updatedLifestyle);
  } catch (error) {
    console.error('Error updating lifestyle data:', error);
    res.status(500).json({ error: 'Failed to update lifestyle data' });
  }
});

// Handler for getting lifestyle data by patient ID
router.get('/patients/:id/lifestyle', async (req, res) => {
  const patientId = req.params.id;
  try {
    const lifestyle = await getLifestyleByPatientId(patientId);
    if (!lifestyle) {
      res.status(404).json({ error: 'Lifestyle data not found for this patient' });
    } else {
      res.status(200).json(lifestyle);
    }
  } catch (error) {
    console.error('Error fetching lifestyle data:', error);
    res.status(500).json({ error: 'Failed to fetch lifestyle data' });
  }
});


// Start the Express server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
