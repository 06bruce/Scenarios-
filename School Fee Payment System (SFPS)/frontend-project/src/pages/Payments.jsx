import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    paymentId: '', amountPaid: '', paymentDate: '', paymentMethod: 'Cash', balance: '', studentId: '', feeId: ''
  });

  const fetchData = async () => {
    try {
      const [pRes, sRes, fRes] = await Promise.all([API.get('/payments'), API.get('/students'), API.get('/feestructures')]);
      setPayments(pRes.data);
      setStudents(sRes.data);
      setFees(fRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await API.put(`/payments/${currentId}`, formData);
      else await API.post('/payments', formData);
      resetForm();
      fetchData();
    } catch (err) { alert('Error saving payment: ' + err.message); }
  };

  const handleEdit = (p) => {
    setIsEditing(true);
    setCurrentId(p._id);
    setFormData({
      paymentId: p.paymentId,
      amountPaid: p.amountPaid,
      paymentDate: p.paymentDate.split('T')[0],
      paymentMethod: p.paymentMethod,
      balance: p.balance,
      studentId: p.studentId._id,
      feeId: p.feeId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payment?')) {
      try { await API.delete(`/payments/${id}`); fetchData(); }
      catch (err) { alert('Error deleting payment: ' + err.message); }
    }
  };

  const resetForm = () => {
    setFormData({ paymentId: '', amountPaid: '', paymentDate: '', paymentMethod: 'Cash', balance: '', studentId: '', feeId: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isEditing ? 'Edit Payment' : 'New Payment'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Payment ID" className="border p-2 rounded" required
            value={formData.paymentId} onChange={(e) => setFormData({...formData, paymentId: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})}>
            <option value="">Select Student</option>
            {students.map(s => <option key={s._id} value={s._id}>{s.firstName} {s.lastName}</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.feeId} onChange={(e) => setFormData({...formData, feeId: e.target.value})}>
            <option value="">Select Fee Structure</option>
            {fees.map(f => <option key={f._id} value={f._id}>{f.className} - {f.termName}</option>)}
          </select>
          <input type="number" placeholder="Amount Paid" className="border p-2 rounded" required
            value={formData.amountPaid} onChange={(e) => setFormData({...formData, amountPaid: e.target.value})} />
          <input type="date" className="border p-2 rounded" required
            value={formData.paymentDate} onChange={(e) => setFormData({...formData, paymentDate: e.target.value})} />
          <input type="text" placeholder="Payment Method" className="border p-2 rounded" required
            value={formData.paymentMethod} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
          <input type="number" placeholder="Balance" className="border p-2 rounded" required
            value={formData.balance} onChange={(e) => setFormData({...formData, balance: e.target.value})} />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Payment Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Balance</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="table-row-striped">
                  <td className="p-2 border">{p.paymentId}</td>
                  <td className="p-2 border">{p.studentId?.firstName} {p.studentId?.lastName}</td>
                  <td className="p-2 border">{p.amountPaid.toLocaleString()}</td>
                  <td className="p-2 border">{p.balance.toLocaleString()}</td>
                  <td className="p-2 border">{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
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

export default Payments;
