import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    orderId: '', orderDate: '', orderTime: '', quantity: '', totalAmount: '', paymentMethod: 'Cash', customerId: '', menuId: ''
  });

  const fetchData = async () => {
    try {
      const [oRes, cRes, iRes] = await Promise.all([API.get('/orders'), API.get('/customers'), API.get('/menuitems')]);
      setOrders(oRes.data);
      setCustomers(cRes.data);
      setItems(iRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await API.put(`/orders/${currentId}`, formData);
      else await API.post('/orders', formData);
      resetForm();
      fetchData();
    } catch (err) { alert('Error saving order: ' + err.message); }
  };

  const handleEdit = (o) => {
    setIsEditing(true);
    setCurrentId(o._id);
    setFormData({
      orderId: o.orderId,
      orderDate: o.orderDate.split('T')[0],
      orderTime: o.orderTime,
      quantity: o.quantity,
      totalAmount: o.totalAmount,
      paymentMethod: o.paymentMethod,
      customerId: o.customerId._id,
      menuId: o.menuId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this order?')) {
      try { await API.delete(`/orders/${id}`); fetchData(); }
      catch (err) { alert('Error deleting order: ' + err.message); }
    }
  };

  const resetForm = () => {
    setFormData({ orderId: '', orderDate: '', orderTime: '', quantity: '', totalAmount: '', paymentMethod: 'Cash', customerId: '', menuId: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isEditing ? 'Edit Order' : 'New Order'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Order ID" className="border p-2 rounded" required
            value={formData.orderId} onChange={(e) => setFormData({...formData, orderId: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.customerId} onChange={(e) => setFormData({...formData, customerId: e.target.value})}>
            <option value="">Select Customer</option>
            {customers.map(c => <option key={c._id} value={c._id}>{c.firstName} {c.lastName} (Table {c.tableNumber})</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.menuId} onChange={(e) => setFormData({...formData, menuId: e.target.value})}>
            <option value="">Select Menu Item</option>
            {items.map(i => <option key={i._id} value={i._id}>{i.itemName} ({i.unitPrice} RWF)</option>)}
          </select>
          <input type="number" placeholder="Quantity" className="border p-2 rounded" required
            value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
          <input type="date" className="border p-2 rounded" required
            value={formData.orderDate} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} />
          <input type="time" className="border p-2 rounded" required
            value={formData.orderTime} onChange={(e) => setFormData({...formData, orderTime: e.target.value})} />
          <input type="number" placeholder="Total Amount" className="border p-2 rounded" required
            value={formData.totalAmount} onChange={(e) => setFormData({...formData, totalAmount: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.paymentMethod} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}>
            <option value="Cash">Cash</option>
            <option value="Momo">Mobile Money</option>
            <option value="Card">Card</option>
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">{isEditing ? 'Update Order' : 'Add Order'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Order Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="table-row-striped">
                  <td className="p-2 border">{o.orderId}</td>
                  <td className="p-2 border">{o.customerId?.firstName} {o.customerId?.lastName}</td>
                  <td className="p-2 border">{o.menuId?.itemName}</td>
                  <td className="p-2 border text-center">{o.quantity}</td>
                  <td className="p-2 border">{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td className="p-2 border">{o.totalAmount.toLocaleString()}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(o)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDelete(o._id)} className="text-red-600">Delete</button>
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

export default Orders;
