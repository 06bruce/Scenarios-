import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await API.get('/rentals');
        setRentals(res.data);
      } catch (err) { console.error(err); }
    };
    fetchRentals();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Monthly Rental Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Client Name</th>
                <th className="p-3 border">Equipment</th>
                <th className="p-3 border">Start Date</th>
                <th className="p-3 border">End Date</th>
                <th className="p-3 border">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r._id} className="table-row-striped">
                  <td className="p-3 border">{r.clientId ? `${r.clientId.firstName} ${r.clientId.lastName}` : 'N/A'}</td>
                  <td className="p-3 border">{r.equipmentId ? r.equipmentId.equipmentName : 'N/A'}</td>
                  <td className="p-3 border">{new Date(r.startDate).toLocaleDateString()}</td>
                  <td className="p-3 border">{new Date(r.endDate).toLocaleDateString()}</td>
                  <td className="p-3 border font-semibold">{r.totalCost.toLocaleString()} RWF</td>
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
