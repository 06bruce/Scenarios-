import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({
    guestId: '', firstName: '', lastName: '', nationality: '', telephone: '', email: '', gender: 'Male'
  });

  const fetchGuests = async () => {
    try {
      const res = await API.get('/guests');
      setGuests(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchGuests(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/guests', formData);
      setFormData({ guestId: '', firstName: '', lastName: '', nationality: '', telephone: '', email: '', gender: 'Male' });
      fetchGuests();
    } catch (err) { alert('Error adding guest: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Guest</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Guest ID" className="border p-2 rounded" required
            value={formData.guestId} onChange={(e) => setFormData({...formData, guestId: e.target.value})} />
          <input type="text" placeholder="First Name" className="border p-2 rounded" required
            value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          <input type="text" placeholder="Last Name" className="border p-2 rounded" required
            value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          <input type="text" placeholder="Nationality" className="border p-2 rounded" required
            value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} />
          <input type="text" placeholder="Telephone" className="border p-2 rounded" required
            value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
          <input type="email" placeholder="Email" className="border p-2 rounded" required
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Register Guest</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Guest List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Nationality</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr key={g._id} className="table-row-striped">
                  <td className="p-2 border">{g.guestId}</td>
                  <td className="p-2 border">{g.firstName} {g.lastName}</td>
                  <td className="p-2 border">{g.nationality}</td>
                  <td className="p-2 border">{g.telephone}</td>
                  <td className="p-2 border">{g.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Guests;
