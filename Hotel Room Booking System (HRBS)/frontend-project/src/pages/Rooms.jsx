import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomId: '', roomNumber: '', roomType: 'Single', pricePerNight: '', status: 'Available'
  });

  const fetchRooms = async () => {
    try {
      const res = await API.get('/rooms');
      setRooms(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/rooms', formData);
      setFormData({ roomId: '', roomNumber: '', roomType: 'Single', pricePerNight: '', status: 'Available' });
      fetchRooms();
    } catch (err) { alert('Error adding room: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Room</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Room ID" className="border p-2 rounded" required
            value={formData.roomId} onChange={(e) => setFormData({...formData, roomId: e.target.value})} />
          <input type="text" placeholder="Room Number" className="border p-2 rounded" required
            value={formData.roomNumber} onChange={(e) => setFormData({...formData, roomNumber: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.roomType} onChange={(e) => setFormData({...formData, roomType: e.target.value})}>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Family">Family</option>
          </select>
          <input type="number" placeholder="Price Per Night" className="border p-2 rounded" required
            value={formData.pricePerNight} onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Add Room</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Room List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">Room ID</th>
                <th className="p-2 border">Number</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r._id} className="table-row-striped">
                  <td className="p-2 border">{r.roomId}</td>
                  <td className="p-2 border">{r.roomNumber}</td>
                  <td className="p-2 border">{r.roomType}</td>
                  <td className="p-2 border">{r.pricePerNight}</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      r.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
