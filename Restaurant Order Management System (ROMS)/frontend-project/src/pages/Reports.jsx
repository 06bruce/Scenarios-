import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders');
        setOrders(res.data);
      } catch (err) { console.error(err); }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Daily Sales Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Customer Name</th>
                <th className="p-3 border">Item Name</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Order Date</th>
                <th className="p-3 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="table-row-striped">
                  <td className="p-3 border">{o.customerId ? `${o.customerId.firstName} ${o.customerId.lastName}` : 'N/A'}</td>
                  <td className="p-3 border">{o.menuId ? o.menuId.itemName : 'N/A'}</td>
                  <td className="p-3 border text-center">{o.quantity}</td>
                  <td className="p-3 border">{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td className="p-3 border font-semibold">{o.totalAmount.toLocaleString()} RWF</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td colSpan="4" className="p-3 border text-right">Total Sales:</td>
                <td className="p-3 border">
                  {orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()} RWF
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
