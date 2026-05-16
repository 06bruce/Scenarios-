import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: '', categoryName: '', description: ''
  });

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/categories', formData);
      setFormData({ categoryId: '', categoryName: '', description: '' });
      fetchCategories();
    } catch (err) { alert('Error adding category: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Category</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Category ID" className="border p-2 rounded" required
            value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} />
          <input type="text" placeholder="Category Name" className="border p-2 rounded" required
            value={formData.categoryName} onChange={(e) => setFormData({...formData, categoryName: e.target.value})} />
          <input type="text" placeholder="Description" className="border p-2 rounded md:col-span-2" required
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Add Category</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Category List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id} className="table-row-striped">
                  <td className="p-2 border">{c.categoryId}</td>
                  <td className="p-2 border">{c.categoryName}</td>
                  <td className="p-2 border">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
