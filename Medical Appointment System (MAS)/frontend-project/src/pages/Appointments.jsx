import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    appointmentId: '', appointmentDate: '', appointmentTime: '', diagnosis: '', status: 'Scheduled', patientId: '', doctorId: ''
  });

  const fetchData = async () => {
    try {
      const [aRes, pRes, dRes] = await Promise.all([API.get('/appointments'), API.get('/patients'), API.get('/doctors')]);
      setAppointments(aRes.data);
      setPatients(pRes.data);
      setDoctors(dRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await API.put(`/appointments/${currentId}`, formData);
      else await API.post('/appointments', formData);
      resetForm();
      fetchData();
    } catch (err) { alert('Error saving appointment: ' + err.message); }
  };

  const handleEdit = (a) => {
    setIsEditing(true);
    setCurrentId(a._id);
    setFormData({
      appointmentId: a.appointmentId,
      appointmentDate: a.appointmentDate.split('T')[0],
      appointmentTime: a.appointmentTime,
      diagnosis: a.diagnosis,
      status: a.status,
      patientId: a.patientId._id,
      doctorId: a.doctorId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment?')) {
      try { await API.delete(`/appointments/${id}`); fetchData(); }
      catch (err) { alert('Error deleting appointment: ' + err.message); }
    }
  };

  const resetForm = () => {
    setFormData({ appointmentId: '', appointmentDate: '', appointmentTime: '', diagnosis: '', status: 'Scheduled', patientId: '', doctorId: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isEditing ? 'Edit Appointment' : 'New Appointment'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Appointment ID" className="border p-2 rounded" required
            value={formData.appointmentId} onChange={(e) => setFormData({...formData, appointmentId: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})}>
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>)}
          </select>
          <select className="border p-2 rounded" required
            value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})}>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d._id} value={d._id}>{d.firstName} {d.lastName} ({d.specialization})</option>)}
          </select>
          <input type="date" className="border p-2 rounded" required
            value={formData.appointmentDate} onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} />
          <input type="time" className="border p-2 rounded" required
            value={formData.appointmentTime} onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} />
          <input type="text" placeholder="Diagnosis" className="border p-2 rounded" required
            value={formData.diagnosis} onChange={(e) => setFormData({...formData, diagnosis: e.target.value})} />
          <select className="border p-2 rounded" required
            value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Appointment Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Patient</th>
                <th className="p-2 border">Doctor</th>
                <th className="p-2 border">Date & Time</th>
                <th className="p-2 border">Diagnosis</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="table-row-striped">
                  <td className="p-2 border">{a.appointmentId}</td>
                  <td className="p-2 border">{a.patientId?.firstName} {a.patientId?.lastName}</td>
                  <td className="p-2 border">{a.doctorId?.firstName} {a.doctorId?.lastName}</td>
                  <td className="p-2 border text-sm">{new Date(a.appointmentDate).toLocaleDateString()} at {a.appointmentTime}</td>
                  <td className="p-2 border">{a.diagnosis}</td>
                  <td className="p-2 border">{a.status}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(a)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDelete(a._id)} className="text-red-600">Delete</button>
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

export default Appointments;
