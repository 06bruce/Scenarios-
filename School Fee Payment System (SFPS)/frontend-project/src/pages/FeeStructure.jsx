import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const FeeStructure = () => {
  const [fees, setFees] = useState([]);
  const [formData, setFormData] = useState({
    feeId: '', className: '', termName: 'Term 1', amount: '', academicYear: '2024'
  });

  const fetchFees = async () => {
    try {
      const res = await API.get('/feestructures');
      setFees(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchFees(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/feestructures', formData);
      setFormData({ feeId: '', className: '', termName: 'Term 1', amount: '', academicYear: '2024' });
      fetchFees();
    } catch (err) { alert('Error adding fee: ' + err.message); }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Fee Structure</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Fee ID" className="border p-2 rounded" required
            value={formData.feeId} onChange={(e) => setFormData({...formData, feeId: e.target.value})} />
          <input type="text" placeholder="Class Name" className="border p-2 rounded" required
            value={formData.className} onChange={(e) => setFormData({...formData, className: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.termName} onChange={(e) => setFormData({...formData, termName: e.target.value})}>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
          <input type="number" placeholder="Amount" className="border p-2 rounded" required
            value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
          <input type="text" placeholder="Academic Year" className="border p-2 rounded" required
            value={formData.academicYear} onChange={(e) => setFormData({...formData, academicYear: e.target.value})} />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Add Fee Structure</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Fee Structure List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Term</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Year</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f) => (
                <tr key={f._id} className="table-row-striped">
                  <td className="p-2 border">{f.className}</td>
                  <td className="p-2 border">{f.termName}</td>
                  <td className="p-2 border">{f.amount.toLocaleString()} RWF</td>
                  <td className="p-2 border">{f.academicYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;
