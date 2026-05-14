import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get('/tickets');
        setTickets(res.data);
      } catch (err) { console.error(err); }
    };
    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Daily Ticket Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Passenger Name</th>
                <th className="p-3 border">Route</th>
                <th className="p-3 border">Seat Number</th>
                <th className="p-3 border">Travel Date</th>
                <th className="p-3 border">Ticket Price</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t._id} className="table-row-striped">
                  <td className="p-3 border">{t.passengerId ? `${t.passengerId.firstName} ${t.passengerId.lastName}` : 'N/A'}</td>
                  <td className="p-3 border">{t.routeId ? `${t.routeId.origin} - ${t.routeId.destination}` : 'N/A'}</td>
                  <td className="p-3 border text-center">{t.seatNumber}</td>
                  <td className="p-3 border">{new Date(t.travelDate).toLocaleDateString()}</td>
                  <td className="p-3 border font-semibold">{t.ticketPrice.toLocaleString()} RWF</td>
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
