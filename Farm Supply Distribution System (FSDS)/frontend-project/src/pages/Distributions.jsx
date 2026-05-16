import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Distributions = () => {
  const [distributions, setDistributions] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [formData, setFormData] = useState({
    distributionId: '',
    farmer: '',
    supply: '',
    quantity: '',
    distributionDate: '',
    status: 'Pending'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDistributions();
    fetchFarmers();
    fetchSupplies();
  }, []);

  const fetchDistributions = async () => {
    const response = await api.get('/distributions');
    setDistributions(response.data);
  };

  const fetchFarmers = async () => {
    const response = await api.get('/farmers');
    setFarmers(response.data);
  };

  const fetchSupplies = async () => {
    const response = await api.get('/supplies');
    setSupplies(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/distributions/${editingId}`, { ...formData, quantity: Number(formData.quantity) });
      setEditingId(null);
    } else {
      await api.post('/distributions', { ...formData, quantity: Number(formData.quantity) });
    }
    setFormData({ distributionId: '', farmer: '', supply: '', quantity: '', distributionDate: '', status: 'Pending' });
    fetchDistributions();
  };

  const handleEdit = (dist) => {
    setFormData({
      distributionId: dist.distributionId,
      farmer: dist.farmer._id,
      supply: dist.supply._id,
      quantity: dist.quantity,
      distributionDate: dist.distributionDate.split('T')[0],
      status: dist.status
    });
    setEditingId(dist._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/distributions/${id}`);
    fetchDistributions();
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Distributions</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Distribution' : 'Add New Distribution'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Distribution ID"
            value={formData.distributionId}
            onChange={(e) => setFormData({ ...formData, distributionId: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <select
            value={formData.farmer}
            onChange={(e) => setFormData({ ...formData, farmer: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select Farmer</option>
            {farmers.map((f) => (
              <option key={f._id} value={f._id}>{f.firstName} {f.lastName}</option>
            ))}
          </select>
          <select
            value={formData.supply}
            onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select Supply</option>
            {supplies.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="date"
            value={formData.distributionDate}
            onChange={(e) => setFormData({ ...formData, distributionDate: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            {editingId ? 'Update Distribution' : 'Add Distribution'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ distributionId: '', farmer: '', supply: '', quantity: '', distributionDate: '', status: 'Pending' }); }} className="col-span-2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500">
              Cancel
            </button>
          )}
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supply</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {distributions.map((dist) => (
              <tr key={dist._id}>
                <td className="px-6 py-4 whitespace-nowrap">{dist.distributionId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.farmer?.firstName} {dist.farmer?.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.supply?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(dist.distributionDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(dist)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button onClick={() => handleDelete(dist._id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Distributions;
