import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Mappings() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [form, setForm] = useState({ patient: '', doctor: '' });
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [patientsRes, doctorsRes, mappingsRes] = await Promise.all([
        API.get('/patients'),
        API.get('/doctors'),
        API.get('/mappings'),
      ]);
      setPatients(patientsRes.data);
      setDoctors(doctorsRes.data);
      setMappings(mappingsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/mappings', form);
      setForm({ patient: '', doctor: '' });
      fetchAll();
    } catch (err) {
      setError('Failed to assign doctor');
    }
  };

  const handleDelete = async id => {
    try {
      await API.delete(`/mappings/${id}`);
      fetchAll();
    } catch {
      setError('Failed to delete mapping');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Patient-Doctor Mappings</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <select name="patient" value={form.patient} onChange={handleChange} className="p-2 border rounded" required>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select name="doctor" value={form.doctor} onChange={handleChange} className="p-2 border rounded" required>
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Assign</button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {mappings.map(m => (
          <li key={m._id} className="flex justify-between items-center border-b py-2">
            <span>{m.patient?.name} - {m.doctor?.name}</span>
            <button onClick={() => handleDelete(m._id)} className="text-red-600">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
