import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [formData, setFormData] = useState({
    farmerId: '',
    firstName: '',
    lastName: '',
    telephone: '',
    farmLocation: '',
    gender: ''
  });

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    const response = await api.get('/farmers');
    setFarmers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/farmers', formData);
    setFormData({ farmerId: '', firstName: '', lastName: '', telephone: '', farmLocation: '', gender: '' });
    fetchFarmers();
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Farmers</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Farmer</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Farmer ID"
            value={formData.farmerId}
            onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Telephone"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Farm Location"
            value={formData.farmLocation}
            onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Add Farmer
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telephone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {farmers.map((farmer) => (
              <tr key={farmer._id}>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.farmerId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.firstName} {farmer.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.farmLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{farmer.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Farmers;
