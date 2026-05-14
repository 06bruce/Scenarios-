import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    equipmentId: '', equipmentName: '', brand: '', condition: 'New', dailyRate: ''
  });

  const fetchEquipment = async () => {
    try {
      const res = await API.get('/equipment');
      setEquipment(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchEquipment(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/equipment', formData);
      setFormData({ equipmentId: '', equipmentName: '', brand: '', condition: 'New', dailyRate: '' });
      fetchEquipment();
    } catch (err) { alert('Error adding equipment: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Equipment</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Equipment ID" className="border p-2 rounded" required
            value={formData.equipmentId} onChange={(e) => setFormData({...formData, equipmentId: e.target.value})} />
          <input type="text" placeholder="Equipment Name" className="border p-2 rounded" required
            value={formData.equipmentName} onChange={(e) => setFormData({...formData, equipmentName: e.target.value})} />
          <input type="text" placeholder="Brand" className="border p-2 rounded" required
            value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})}>
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <input type="number" placeholder="Daily Rate" className="border p-2 rounded md:col-span-2" required
            value={formData.dailyRate} onChange={(e) => setFormData({...formData, dailyRate: e.target.value})} />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Add Equipment</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Equipment List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Brand</th>
                <th className="p-2 border">Rate/Day</th>
                <th className="p-2 border">Condition</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((e) => (
                <tr key={e._id} className="table-row-striped">
                  <td className="p-2 border">{e.equipmentId}</td>
                  <td className="p-2 border">{e.equipmentName}</td>
                  <td className="p-2 border">{e.brand}</td>
                  <td className="p-2 border">{e.dailyRate.toLocaleString()} RWF</td>
                  <td className="p-2 border">{e.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
