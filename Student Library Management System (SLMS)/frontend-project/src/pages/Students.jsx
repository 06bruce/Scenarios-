import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    className: '',
    telephone: '',
    address: ''
  });

  const fetchStudents = async () => {
    try {
      const res = await API.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/students', formData);
      setFormData({
        studentId: '',
        firstName: '',
        lastName: '',
        gender: 'Male',
        className: '',
        telephone: '',
        address: ''
      });
      fetchStudents();
    } catch (err) {
      alert('Error adding student: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text" placeholder="Student ID" className="border p-2 rounded" required
            value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})}
          />
          <input
            type="text" placeholder="First Name" className="border p-2 rounded" required
            value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
          <input
            type="text" placeholder="Last Name" className="border p-2 rounded" required
            value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
          <select
            className="border p-2 rounded" required
            value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text" placeholder="Class Name" className="border p-2 rounded" required
            value={formData.className} onChange={(e) => setFormData({...formData, className: e.target.value})}
          />
          <input
            type="text" placeholder="Telephone" className="border p-2 rounded" required
            value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})}
          />
          <input
            type="text" placeholder="Address" className="border p-2 rounded md:col-span-2" required
            value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Register Student</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Student List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="table-row-striped">
                  <td className="p-2 border">{student.studentId}</td>
                  <td className="p-2 border">{student.firstName} {student.lastName}</td>
                  <td className="p-2 border">{student.gender}</td>
                  <td className="p-2 border">{student.className}</td>
                  <td className="p-2 border">{student.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
