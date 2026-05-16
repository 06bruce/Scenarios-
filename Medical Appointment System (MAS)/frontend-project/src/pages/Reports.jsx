import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get('/appointments');
        setAppointments(res.data);
      } catch (err) { console.error(err); }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Monthly Appointment Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Patient Name</th>
                <th className="p-3 border">Doctor Name</th>
                <th className="p-3 border">Specialization</th>
                <th className="p-3 border">Appointment Date</th>
                <th className="p-3 border">Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="table-row-striped">
                  <td className="p-3 border">{a.patientId ? `${a.patientId.firstName} ${a.patientId.lastName}` : 'N/A'}</td>
                  <td className="p-3 border">{a.doctorId ? `Dr. ${a.doctorId.firstName} ${a.doctorId.lastName}` : 'N/A'}</td>
                  <td className="p-3 border">{a.doctorId?.specialization || 'N/A'}</td>
                  <td className="p-3 border">{new Date(a.appointmentDate).toLocaleDateString()}</td>
                  <td className="p-3 border">{a.diagnosis}</td>
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
