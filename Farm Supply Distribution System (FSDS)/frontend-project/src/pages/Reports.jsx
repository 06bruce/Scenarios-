import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Reports = () => {
  const [distributions, setDistributions] = useState([]);

  useEffect(() => {
    fetchDistributions();
  }, []);

  const fetchDistributions = async () => {
    const response = await api.get('/distributions');
    setDistributions(response.data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Distribution Reports</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distribution ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supply</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distribution Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {distributions.map((dist) => (
              <tr key={dist._id}>
                <td className="px-6 py-4 whitespace-nowrap">{dist.distributionId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.farmer?.firstName} {dist.farmer?.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.supply?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(dist.distributionDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dist.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
