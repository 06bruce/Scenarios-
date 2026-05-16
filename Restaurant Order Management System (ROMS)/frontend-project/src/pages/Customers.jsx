import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '', firstName: '', lastName: '', telephone: '', tableNumber: '', gender: 'Male'
  });

  const fetchCustomers = async () => {
    try {
      const res = await API.get('/customers');
      setCustomers(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/customers', formData);
      setFormData({ customerId: '', firstName: '', lastName: '', telephone: '', tableNumber: '', gender: 'Male' });
      fetchCustomers();
    } catch (err) { alert('Error adding customer: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Customer</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Customer ID" className="border p-2 rounded" required
            value={formData.customerId} onChange={(e) => setFormData({...formData, customerId: e.target.value})} />
          <input type="text" placeholder="First Name" className="border p-2 rounded" required
            value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          <input type="text" placeholder="Last Name" className="border p-2 rounded" required
            value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          <input type="text" placeholder="Telephone" className="border p-2 rounded" required
            value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
          <input type="text" placeholder="Table Number" className="border p-2 rounded" required
            value={formData.tableNumber} onChange={(e) => setFormData({...formData, tableNumber: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Register Customer</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Customer List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Table</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="table-row-striped">
                  <td className="p-2 border">{c.customerId}</td>
                  <td className="p-2 border">{c.firstName} {c.lastName}</td>
                  <td className="p-2 border">{c.telephone}</td>
                  <td className="p-2 border">{c.tableNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
