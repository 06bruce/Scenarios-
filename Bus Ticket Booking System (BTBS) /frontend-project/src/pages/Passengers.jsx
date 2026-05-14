import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [formData, setFormData] = useState({
    passengerId: '', firstName: '', lastName: '', idNumber: '', telephone: '', gender: 'Male'
  });

  const fetchPassengers = async () => {
    try {
      const res = await API.get('/passengers');
      setPassengers(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPassengers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/passengers', formData);
      setFormData({ passengerId: '', firstName: '', lastName: '', idNumber: '', telephone: '', gender: 'Male' });
      fetchPassengers();
    } catch (err) { alert('Error adding passenger: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Passenger</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Passenger ID" className="border p-2 rounded" required
            value={formData.passengerId} onChange={(e) => setFormData({...formData, passengerId: e.target.value})} />
          <input type="text" placeholder="First Name" className="border p-2 rounded" required
            value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          <input type="text" placeholder="Last Name" className="border p-2 rounded" required
            value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          <input type="text" placeholder="ID Number" className="border p-2 rounded" required
            value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} />
          <input type="text" placeholder="Telephone" className="border p-2 rounded" required
            value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Register Passenger</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Passenger List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">ID Number</th>
                <th className="p-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((p) => (
                <tr key={p._id} className="table-row-striped">
                  <td className="p-2 border">{p.passengerId}</td>
                  <td className="p-2 border">{p.firstName} {p.lastName}</td>
                  <td className="p-2 border">{p.idNumber}</td>
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

export default Passengers;
