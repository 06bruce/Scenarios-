import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await API.get('/stockmovements');
        setMovements(res.data);
      } catch (err) { console.error(err); }
    };
    fetchMovements();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Monthly Stock Movement Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Product Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Movement Type</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Movement Date</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m) => (
                <tr key={m._id} className="table-row-striped">
                  <td className="p-3 border">{m.productId ? m.productId.productName : 'N/A'}</td>
                  <td className="p-3 border">{m.categoryId ? m.categoryId.categoryName : 'N/A'}</td>
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      m.movementType === 'In' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{m.movementType === 'In' ? 'Stock In' : 'Stock Out'}</span>
                  </td>
                  <td className="p-3 border font-semibold">{m.quantity.toLocaleString()}</td>
                  <td className="p-3 border">{new Date(m.movementDate).toLocaleDateString()}</td>
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
