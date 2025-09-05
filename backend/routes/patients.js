import express from 'express';
import { body, validationResult } from 'express-validator';
import Patient from '../src/models/Patient.js';
import auth from '../src/middleware/auth.js';

const router = express.Router();

// Add new patient
router.post('/', auth, [
  body('name').notEmpty(),
  body('age').isInt({ min: 0 }),
  body('gender').isIn(['male', 'female', 'other'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { name, age, gender } = req.body;
    const patient = new Patient({ name, age, gender, createdBy: req.user });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all patients created by user
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find({ createdBy: req.user });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get patient by id
router.get('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id, createdBy: req.user });
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update patient
router.put('/:id', auth, [
  body('name').optional().notEmpty(),
  body('age').optional().isInt({ min: 0 }),
  body('gender').optional().isIn(['male', 'female', 'other'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user },
      req.body,
      { new: true }
    );
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete patient
router.delete('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({ _id: req.params.id, createdBy: req.user });
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });
    res.json({ msg: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
