import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    bookingId: '', checkInDate: '', checkOutDate: '', totalAmount: '', paymentStatus: 'Pending', guestId: '', roomId: ''
  });

  const fetchData = async () => {
    try {
      const [bRes, gRes, rRes] = await Promise.all([API.get('/bookings'), API.get('/guests'), API.get('/rooms')]);
      setBookings(bRes.data);
      setGuests(gRes.data);
      setRooms(rRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await API.put(`/bookings/${currentId}`, formData);
      else await API.post('/bookings', formData);
      resetForm();
      fetchData();
    } catch (err) { alert('Error saving booking: ' + err.message); }
  };

  const handleEdit = (b) => {
    setIsEditing(true);
    setCurrentId(b._id);
    setFormData({
      bookingId: b.bookingId,
      checkInDate: b.checkInDate.split('T')[0],
      checkOutDate: b.checkOutDate.split('T')[0],
      totalAmount: b.totalAmount,
      paymentStatus: b.paymentStatus,
      guestId: b.guestId._id,
      roomId: b.roomId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this booking?')) {
      try { await API.delete(`/bookings/${id}`); fetchData(); }
      catch (err) { alert('Error deleting booking: ' + err.message); }
    }
  };

  const resetForm = () => {
    setFormData({ bookingId: '', checkInDate: '', checkOutDate: '', totalAmount: '', paymentStatus: 'Pending', guestId: '', roomId: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isEditing ? 'Edit Booking' : 'New Booking'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Booking ID" className="border p-2 rounded" required
            value={formData.bookingId} onChange={(e) => setFormData({...formData, bookingId: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.guestId} onChange={(e) => setFormData({...formData, guestId: e.target.value})}>
            <option value="">Select Guest</option>
            {guests.map(g => <option key={g._id} value={g._id}>{g.firstName} {g.lastName}</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.roomId} onChange={(e) => setFormData({...formData, roomId: e.target.value})}>
            <option value="">Select Room</option>
            {rooms.map(r => <option key={r._id} value={r._id}>{r.roomNumber} ({r.roomType})</option>)}
          </select>
          <input type="date" className="border p-2 rounded" required
            value={formData.checkInDate} onChange={(e) => setFormData({...formData, checkInDate: e.target.value})} />
          <input type="date" className="border p-2 rounded" required
            value={formData.checkOutDate} onChange={(e) => setFormData({...formData, checkOutDate: e.target.value})} />
          <input type="number" placeholder="Total Amount" className="border p-2 rounded" required
            value={formData.totalAmount} onChange={(e) => setFormData({...formData, totalAmount: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.paymentStatus} onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Booking Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Guest</th>
                <th className="p-2 border">Room</th>
                <th className="p-2 border">Check In/Out</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="table-row-striped">
                  <td className="p-2 border">{b.bookingId}</td>
                  <td className="p-2 border">{b.guestId?.firstName} {b.guestId?.lastName}</td>
                  <td className="p-2 border">{b.roomId?.roomNumber}</td>
                  <td className="p-2 border text-sm">{new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}</td>
                  <td className="p-2 border">{b.totalAmount}</td>
                  <td className="p-2 border">{b.paymentStatus}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(b)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDelete(b._id)} className="text-red-600">Delete</button>
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

export default Bookings;
