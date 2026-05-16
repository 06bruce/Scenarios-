import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '', firstName: '', lastName: '', dateOfBirth: '', gender: 'Male', telephone: '', address: ''
  });

  const fetchPatients = async () => {
    try {
      const res = await API.get('/patients');
      setPatients(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/patients', formData);
      setFormData({ patientId: '', firstName: '', lastName: '', dateOfBirth: '', gender: 'Male', telephone: '', address: '' });
      fetchPatients();
    } catch (err) { alert('Error adding patient: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Patient</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Patient ID" className="border p-2 rounded" required
            value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} />
          <input type="text" placeholder="First Name" className="border p-2 rounded" required
            value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          <input type="text" placeholder="Last Name" className="border p-2 rounded" required
            value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          <input type="date" className="border p-2 rounded" required
            value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" placeholder="Telephone" className="border p-2 rounded" required
            value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
          <input type="text" placeholder="Address" className="border p-2 rounded md:col-span-2" required
            value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Register Patient</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Patient List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">DOB</th>
                <th className="p-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id} className="table-row-striped">
                  <td className="p-2 border">{p.patientId}</td>
                  <td className="p-2 border">{p.firstName} {p.lastName}</td>
                  <td className="p-2 border">{new Date(p.dateOfBirth).toLocaleDateString()}</td>
                  <td className="p-2 border">{p.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
