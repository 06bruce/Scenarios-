import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '', firstName: '', lastName: '', specialization: '', telephone: '', gender: 'Male'
  });

  const fetchDoctors = async () => {
    try {
      const res = await API.get('/doctors');
      setDoctors(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/doctors', formData);
      setFormData({ doctorId: '', firstName: '', lastName: '', specialization: '', telephone: '', gender: 'Male' });
      fetchDoctors();
    } catch (err) { alert('Error adding doctor: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Doctor ID" className="border p-2 rounded" required
            value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} />
          <input type="text" placeholder="First Name" className="border p-2 rounded" required
            value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          <input type="text" placeholder="Last Name" className="border p-2 rounded" required
            value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          <input type="text" placeholder="Specialization" className="border p-2 rounded" required
            value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} />
          <input type="text" placeholder="Telephone" className="border p-2 rounded" required
            value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Register Doctor</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Doctor List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Specialization</th>
                <th className="p-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d._id} className="table-row-striped">
                  <td className="p-2 border">{d.doctorId}</td>
                  <td className="p-2 border">{d.firstName} {d.lastName}</td>
                  <td className="p-2 border">{d.specialization}</td>
                  <td className="p-2 border">{d.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
