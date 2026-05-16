import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: '', productName: '', description: '', unitPrice: '', reorderLevel: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', formData);
      setFormData({ productId: '', productName: '', description: '', unitPrice: '', reorderLevel: '' });
      fetchProducts();
    } catch (err) { alert('Error adding product: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Product ID" className="border p-2 rounded" required
            value={formData.productId} onChange={(e) => setFormData({...formData, productId: e.target.value})} />
          <input type="text" placeholder="Product Name" className="border p-2 rounded" required
            value={formData.productName} onChange={(e) => setFormData({...formData, productName: e.target.value})} />
          <input type="text" placeholder="Description" className="border p-2 rounded md:col-span-2" required
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          <input type="number" placeholder="Unit Price" className="border p-2 rounded" required
            value={formData.unitPrice} onChange={(e) => setFormData({...formData, unitPrice: e.target.value})} />
          <input type="number" placeholder="Reorder Level" className="border p-2 rounded" required
            value={formData.reorderLevel} onChange={(e) => setFormData({...formData, reorderLevel: e.target.value})} />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Register Product</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Product List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Reorder Level</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="table-row-striped">
                  <td className="p-2 border">{p.productId}</td>
                  <td className="p-2 border">{p.productName}</td>
                  <td className="p-2 border">{p.unitPrice.toLocaleString()}</td>
                  <td className="p-2 border">{p.reorderLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
