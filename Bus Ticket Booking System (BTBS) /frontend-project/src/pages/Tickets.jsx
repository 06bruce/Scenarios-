import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    ticketId: '', seatNumber: '', travelDate: '', ticketPrice: '', paymentStatus: 'Paid', passengerId: '', routeId: ''
  });

  const fetchData = async () => {
    try {
      const [tRes, pRes, rRes] = await Promise.all([API.get('/tickets'), API.get('/passengers'), API.get('/routes')]);
      setTickets(tRes.data);
      setPassengers(pRes.data);
      setRoutes(rRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await API.put(`/tickets/${currentId}`, formData);
      else await API.post('/tickets', formData);
      resetForm();
      fetchData();
    } catch (err) { alert('Error saving ticket: ' + err.message); }
  };

  const handleEdit = (t) => {
    setIsEditing(true);
    setCurrentId(t._id);
    setFormData({
      ticketId: t.ticketId,
      seatNumber: t.seatNumber,
      travelDate: t.travelDate.split('T')[0],
      ticketPrice: t.ticketPrice,
      paymentStatus: t.paymentStatus,
      passengerId: t.passengerId._id,
      routeId: t.routeId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this ticket?')) {
      try { await API.delete(`/tickets/${id}`); fetchData(); }
      catch (err) { alert('Error deleting ticket: ' + err.message); }
    }
  };

  const resetForm = () => {
    setFormData({ ticketId: '', seatNumber: '', travelDate: '', ticketPrice: '', paymentStatus: 'Paid', passengerId: '', routeId: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isEditing ? 'Edit Ticket' : 'Book New Ticket'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Ticket ID" className="border p-2 rounded" required
            value={formData.ticketId} onChange={(e) => setFormData({...formData, ticketId: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.passengerId} onChange={(e) => setFormData({...formData, passengerId: e.target.value})}>
            <option value="">Select Passenger</option>
            {passengers.map(p => <option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.routeId} onChange={(e) => setFormData({...formData, routeId: e.target.value})}>
            <option value="">Select Route</option>
            {routes.map(r => <option key={r._id} value={r._id}>{r.origin} - {r.destination}</option>)}
          </select>
          <input type="text" placeholder="Seat Number" className="border p-2 rounded" required
            value={formData.seatNumber} onChange={(e) => setFormData({...formData, seatNumber: e.target.value})} />
          <input type="date" className="border p-2 rounded" required
            value={formData.travelDate} onChange={(e) => setFormData({...formData, travelDate: e.target.value})} />
          <input type="number" placeholder="Ticket Price" className="border p-2 rounded" required
            value={formData.ticketPrice} onChange={(e) => setFormData({...formData, ticketPrice: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.paymentStatus} onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Ticket Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Passenger</th>
                <th className="p-2 border">Route</th>
                <th className="p-2 border">Seat</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t._id} className="table-row-striped">
                  <td className="p-2 border">{t.ticketId}</td>
                  <td className="p-2 border">{t.passengerId?.firstName} {t.passengerId?.lastName}</td>
                  <td className="p-2 border">{t.routeId?.origin} - {t.routeId?.destination}</td>
                  <td className="p-2 border">{t.seatNumber}</td>
                  <td className="p-2 border">{new Date(t.travelDate).toLocaleDateString()}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(t)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDelete(t._id)} className="text-red-600">Delete</button>
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

export default Tickets;
