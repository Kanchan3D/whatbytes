import React from 'react';
import { useNavigate } from 'react-router-dom';
import Patients from '../components/Patients';

export default function PatientsPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Dashboard</button>
            <button onClick={() => navigate('/doctors')} className="text-blue-600 hover:underline">Doctors</button>
            <button onClick={() => navigate('/mappings')} className="text-blue-600 hover:underline">Mappings</button>
            <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Patients />
      </div>
    </div>
  );
}
