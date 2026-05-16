import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await API.get('/payments');
        setPayments(res.data);
      } catch (err) { console.error(err); }
    };
    fetchPayments();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Term Payment Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Student Name</th>
                <th className="p-3 border">Class</th>
                <th className="p-3 border">Amount Paid</th>
                <th className="p-3 border">Balance</th>
                <th className="p-3 border">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="table-row-striped">
                  <td className="p-3 border">{p.studentId ? `${p.studentId.firstName} ${p.studentId.lastName}` : 'N/A'}</td>
                  <td className="p-3 border">{p.studentId?.className || 'N/A'}</td>
                  <td className="p-3 border font-semibold">{p.amountPaid.toLocaleString()} RWF</td>
                  <td className="p-3 border text-red-600 font-semibold">{p.balance.toLocaleString()} RWF</td>
                  <td className="p-3 border">{new Date(p.paymentDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
