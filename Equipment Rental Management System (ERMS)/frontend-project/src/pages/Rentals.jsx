import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [clients, setClients] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    rentalId: '', startDate: '', endDate: '', totalCost: '', depositPaid: '', status: 'Active', clientId: '', equipmentId: ''
  });

  const fetchData = async () => {
    try {
      const [rRes, cRes, eRes] = await Promise.all([API.get('/rentals'), API.get('/clients'), API.get('/equipment')]);
      setRentals(rRes.data);
      setClients(cRes.data);
      setEquipment(eRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await API.put(`/rentals/${currentId}`, formData);
      else await API.post('/rentals', formData);
      resetForm();
      fetchData();
    } catch (err) { alert('Error saving rental: ' + err.message); }
  };

  const handleEdit = (r) => {
    setIsEditing(true);
    setCurrentId(r._id);
    setFormData({
      rentalId: r.rentalId,
      startDate: r.startDate.split('T')[0],
      endDate: r.endDate.split('T')[0],
      totalCost: r.totalCost,
      depositPaid: r.depositPaid,
      status: r.status,
      clientId: r.clientId._id,
      equipmentId: r.equipmentId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this rental record?')) {
      try { await API.delete(`/rentals/${id}`); fetchData(); }
      catch (err) { alert('Error deleting rental: ' + err.message); }
    }
  };

  const resetForm = () => {
    setFormData({ rentalId: '', startDate: '', endDate: '', totalCost: '', depositPaid: '', status: 'Active', clientId: '', equipmentId: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isEditing ? 'Edit Rental Record' : 'New Equipment Rental'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Rental ID" className="border p-2 rounded" required
            value={formData.rentalId} onChange={(e) => setFormData({...formData, rentalId: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})}>
            <option value="">Select Client</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.firstName} {c.lastName}</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.equipmentId} onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}>
            <option value="">Select Equipment</option>
            {equipment.map(eq => <option key={eq._id} value={eq._id}>{eq.equipmentName} ({eq.brand})</option>)}
          </select>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Start Date</label>
            <input type="date" className="border p-2 rounded" required
              value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">End Date</label>
            <input type="date" className="border p-2 rounded" required
              value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
          </div>
          <input type="number" placeholder="Total Cost" className="border p-2 rounded" required
            value={formData.totalCost} onChange={(e) => setFormData({...formData, totalCost: e.target.value})} />
          <input type="number" placeholder="Deposit Paid" className="border p-2 rounded" required
            value={formData.depositPaid} onChange={(e) => setFormData({...formData, depositPaid: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="Active">Active</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">{isEditing ? 'Update Record' : 'Add Record'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Rental Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Client</th>
                <th className="p-2 border">Equipment</th>
                <th className="p-2 border">Dates</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r._id} className="table-row-striped">
                  <td className="p-2 border">{r.rentalId}</td>
                  <td className="p-2 border">{r.clientId?.firstName} {r.clientId?.lastName}</td>
                  <td className="p-2 border">{r.equipmentId?.equipmentName}</td>
                  <td className="p-2 border text-sm">{new Date(r.startDate).toLocaleDateString()} to {new Date(r.endDate).toLocaleDateString()}</td>
                  <td className="p-2 border">{r.totalCost.toLocaleString()}</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      r.status === 'Returned' ? 'bg-green-100 text-green-700' : 
                      r.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>{r.status}</span>
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(r)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDelete(r._id)} className="text-red-600">Delete</button>
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

export default Rentals;
