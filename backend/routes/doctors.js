import express from 'express';
import { body, validationResult } from 'express-validator';
import Doctor from '../src/models/Doctor.js';
import auth from '../src/middleware/auth.js';

const router = express.Router();

// Add new doctor
router.post('/', auth, [
  body('name').notEmpty(),
  body('specialization').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { name, specialization } = req.body;
    const doctor = new Doctor({ name, specialization, createdBy: req.user });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get doctor by id
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update doctor
router.put('/:id', auth, [
  body('name').optional().notEmpty(),
  body('specialization').optional().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user },
      req.body,
      { new: true }
    );
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found or not authorized' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete doctor
router.delete('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndDelete({ _id: req.params.id, createdBy: req.user });
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found or not authorized' });
    res.json({ msg: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
