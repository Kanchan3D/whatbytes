import express from 'express';
import { body, validationResult } from 'express-validator';
import Mapping from '../src/models/Mapping.js';
import Patient from '../src/models/Patient.js';
import Doctor from '../src/models/Doctor.js';
import auth from '../src/middleware/auth.js';

const router = express.Router();

// Assign a doctor to a patient
router.post('/', auth, [
  body('patient').notEmpty(),
  body('doctor').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { patient, doctor } = req.body;
    // Check if patient and doctor exist
    const patientExists = await Patient.findById(patient);
    const doctorExists = await Doctor.findById(doctor);
    if (!patientExists || !doctorExists) return res.status(404).json({ msg: 'Patient or Doctor not found' });
    // Prevent duplicate mapping
    const exists = await Mapping.findOne({ patient, doctor });
    if (exists) return res.status(400).json({ msg: 'Mapping already exists' });
    const mapping = new Mapping({ patient, doctor });
    await mapping.save();
    res.status(201).json(mapping);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all mappings
router.get('/', auth, async (req, res) => {
  try {
    const mappings = await Mapping.find().populate('patient doctor');
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all doctors assigned to a specific patient
router.get('/:patientId', auth, async (req, res) => {
  try {
    const mappings = await Mapping.find({ patient: req.params.patientId }).populate('doctor');
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Remove a doctor from a patient
router.delete('/:id', auth, async (req, res) => {
  try {
    const mapping = await Mapping.findByIdAndDelete(req.params.id);
    if (!mapping) return res.status(404).json({ msg: 'Mapping not found' });
    res.json({ msg: 'Mapping deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
