import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const StockMovements = () => {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    movementId: '', movementType: 'In', quantity: '', movementDate: '', remarks: '', productId: '', categoryId: ''
  });

  const fetchData = async () => {
    try {
      const [mRes, pRes, cRes] = await Promise.all([API.get('/stockmovements'), API.get('/products'), API.get('/categories')]);
      setMovements(mRes.data);
      setProducts(pRes.data);
      setCategories(cRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await API.put(`/stockmovements/${currentId}`, formData);
      else await API.post('/stockmovements', formData);
      resetForm();
      fetchData();
    } catch (err) { alert('Error saving movement: ' + err.message); }
  };

  const handleEdit = (m) => {
    setIsEditing(true);
    setCurrentId(m._id);
    setFormData({
      movementId: m.movementId,
      movementType: m.movementType,
      quantity: m.quantity,
      movementDate: m.movementDate.split('T')[0],
      remarks: m.remarks,
      productId: m.productId._id,
      categoryId: m.categoryId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this movement?')) {
      try { await API.delete(`/stockmovements/${id}`); fetchData(); }
      catch (err) { alert('Error deleting movement: ' + err.message); }
    }
  };

  const resetForm = () => {
    setFormData({ movementId: '', movementType: 'In', quantity: '', movementDate: '', remarks: '', productId: '', categoryId: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isEditing ? 'Edit Movement' : 'New Stock Movement'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Movement ID" className="border p-2 rounded" required
            value={formData.movementId} onChange={(e) => setFormData({...formData, movementId: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.productId} onChange={(e) => setFormData({...formData, productId: e.target.value})}>
            <option value="">Select Product</option>
            {products.map(p => <option key={p._id} value={p._id}>{p.productName}</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.categoryName}</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.movementType} onChange={(e) => setFormData({...formData, movementType: e.target.value})}>
            <option value="In">Stock In</option>
            <option value="Out">Stock Out</option>
          </select>
          <input type="number" placeholder="Quantity" className="border p-2 rounded" required
            value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
          <input type="date" className="border p-2 rounded" required
            value={formData.movementDate} onChange={(e) => setFormData({...formData, movementDate: e.target.value})} />
          <input type="text" placeholder="Remarks" className="border p-2 rounded md:col-span-2" required
            value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Movement Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m) => (
                <tr key={m._id} className="table-row-striped">
                  <td className="p-2 border">{m.movementId}</td>
                  <td className="p-2 border">{m.productId?.productName}</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      m.movementType === 'In' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{m.movementType}</span>
                  </td>
                  <td className="p-2 border">{m.quantity}</td>
                  <td className="p-2 border">{new Date(m.movementDate).toLocaleDateString()}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(m)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDelete(m._id)} className="text-red-600">Delete</button>
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

export default StockMovements;
