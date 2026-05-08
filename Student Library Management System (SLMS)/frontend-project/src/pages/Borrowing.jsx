import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Borrowing = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    borrowId: '',
    borrowDate: '',
    returnDate: '',
    status: 'Borrowed',
    fine: 0,
    studentId: '',
    bookId: ''
  });

  const fetchData = async () => {
    try {
      const [borrowRes, studentRes, bookRes] = await Promise.all([
        API.get('/borrowings'),
        API.get('/students'),
        API.get('/books')
      ]);
      setBorrowings(borrowRes.data);
      setStudents(studentRes.data);
      setBooks(bookRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await API.put(`/borrowings/${currentId}`, formData);
        setIsEditing(false);
        setCurrentId(null);
      } else {
        await API.post('/borrowings', formData);
      }
      resetForm();
      fetchData();
    } catch (err) {
      alert('Error saving borrowing record: ' + err.message);
    }
  };

  const handleEdit = (borrowing) => {
    setIsEditing(true);
    setCurrentId(borrowing._id);
    setFormData({
      borrowId: borrowing.borrowId,
      borrowDate: borrowing.borrowDate.split('T')[0],
      returnDate: borrowing.returnDate.split('T')[0],
      status: borrowing.status,
      fine: borrowing.fine,
      studentId: borrowing.studentId._id,
      bookId: borrowing.bookId._id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await API.delete(`/borrowings/${id}`);
        fetchData();
      } catch (err) {
        alert('Error deleting record: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      borrowId: '',
      borrowDate: '',
      returnDate: '',
      status: 'Borrowed',
      fine: 0,
      studentId: '',
      bookId: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          {isEditing ? 'Edit Borrowing Record' : 'Record New Borrowing'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text" placeholder="Borrow ID" className="border p-2 rounded" required
            value={formData.borrowId} onChange={(e) => setFormData({...formData, borrowId: e.target.value})}
          />
          <select
            className="border p-2 rounded" required
            value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})}
          >
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.studentId})</option>
            ))}
          </select>
          <select
            className="border p-2 rounded" required
            value={formData.bookId} onChange={(e) => setFormData({...formData, bookId: e.target.value})}
          >
            <option value="">Select Book</option>
            {books.map(b => (
              <option key={b._id} value={b._id}>{b.title} ({b.bookId})</option>
            ))}
          </select>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Borrow Date</label>
            <input
              type="date" className="border p-2 rounded" required
              value={formData.borrowDate} onChange={(e) => setFormData({...formData, borrowDate: e.target.value})}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500">Return Date</label>
            <input
              type="date" className="border p-2 rounded" required
              value={formData.returnDate} onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
            />
          </div>
          <select
            className="border p-2 rounded" required
            value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
          </select>
          <input
            type="number" placeholder="Fine" className="border p-2 rounded"
            value={formData.fine} onChange={(e) => setFormData({...formData, fine: e.target.value})}
          />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 btn-primary font-bold">
              {isEditing ? 'Update Record' : 'Add Record'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Borrowing Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Book</th>
                <th className="p-2 border">Dates</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Fine</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.map((b) => (
                <tr key={b._id} className="table-row-striped">
                  <td className="p-2 border">{b.borrowId}</td>
                  <td className="p-2 border">{b.studentId?.firstName} {b.studentId?.lastName}</td>
                  <td className="p-2 border">{b.bookId?.title}</td>
                  <td className="p-2 border text-sm">
                    {new Date(b.borrowDate).toLocaleDateString()} to {new Date(b.returnDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      b.status === 'Returned' ? 'bg-green-100 text-green-700' : 
                      b.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-2 border">{b.fine}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(b)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button onClick={() => handleDelete(b._id)} className="text-red-600 hover:text-red-800">Delete</button>
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

export default Borrowing;
