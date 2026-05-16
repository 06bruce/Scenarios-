import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    menuId: '', itemName: '', category: 'Main Course', unitPrice: '', availability: 'Available'
  });

  const fetchItems = async () => {
    try {
      const res = await API.get('/menuitems');
      setItems(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/menuitems', formData);
      setFormData({ menuId: '', itemName: '', category: 'Main Course', unitPrice: '', availability: 'Available' });
      fetchItems();
    } catch (err) { alert('Error adding menu item: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Menu Item</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Menu ID" className="border p-2 rounded" required
            value={formData.menuId} onChange={(e) => setFormData({...formData, menuId: e.target.value})} />
          <input type="text" placeholder="Item Name" className="border p-2 rounded" required
            value={formData.itemName} onChange={(e) => setFormData({...formData, itemName: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
            <option value="Starters">Starters</option>
          </select>
          <input type="number" placeholder="Unit Price" className="border p-2 rounded" required
            value={formData.unitPrice} onChange={(e) => setFormData({...formData, unitPrice: e.target.value})} />
          <select className="border p-2 rounded md:col-span-2" required
            value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})}>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Add Menu Item</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Menu List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Availability</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id} className="table-row-striped">
                  <td className="p-2 border">{i.menuId}</td>
                  <td className="p-2 border">{i.itemName}</td>
                  <td className="p-2 border">{i.category}</td>
                  <td className="p-2 border">{i.unitPrice.toLocaleString()} RWF</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      i.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{i.availability}</span>
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

export default MenuItems;
