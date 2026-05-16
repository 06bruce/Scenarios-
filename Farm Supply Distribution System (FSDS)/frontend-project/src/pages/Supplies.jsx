import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Supplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [formData, setFormData] = useState({
    supplyId: '',
    name: '',
    category: '',
    unitPrice: '',
    quantityInStock: ''
  });

  useEffect(() => {
    fetchSupplies();
  }, []);

  const fetchSupplies = async () => {
    const response = await api.get('/supplies');
    setSupplies(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/supplies', { ...formData, unitPrice: Number(formData.unitPrice), quantityInStock: Number(formData.quantityInStock) });
    setFormData({ supplyId: '', name: '', category: '', unitPrice: '', quantityInStock: '' });
    fetchSupplies();
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Supplies</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Supply</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Supply ID"
            value={formData.supplyId}
            onChange={(e) => setFormData({ ...formData, supplyId: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={formData.unitPrice}
            onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Quantity in Stock"
            value={formData.quantityInStock}
            onChange={(e) => setFormData({ ...formData, quantityInStock: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            required
          />
          <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Add Supply
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {supplies.map((supply) => (
              <tr key={supply._id}>
                <td className="px-6 py-4 whitespace-nowrap">{supply.supplyId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{supply.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{supply.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">${supply.unitPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{supply.quantityInStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Supplies;
