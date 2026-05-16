import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get('/bookings');
        setBookings(res.data);
      } catch (err) { console.error(err); }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Monthly Booking Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Guest Name</th>
                <th className="p-3 border">Room Type</th>
                <th className="p-3 border">Check In</th>
                <th className="p-3 border">Check Out</th>
                <th className="p-3 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="table-row-striped">
                  <td className="p-3 border">{b.guestId ? `${b.guestId.firstName} ${b.guestId.lastName}` : 'N/A'}</td>
                  <td className="p-3 border">{b.roomId?.roomType || 'N/A'}</td>
                  <td className="p-3 border">{new Date(b.checkInDate).toLocaleDateString()}</td>
                  <td className="p-3 border">{new Date(b.checkOutDate).toLocaleDateString()}</td>
                  <td className="p-3 border font-semibold">{b.totalAmount.toLocaleString()} RWF</td>
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
