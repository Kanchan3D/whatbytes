import mongoose from 'mongoose';

const mappingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
}, { timestamps: true });

export default mongoose.model('Mapping', mappingSchema);
