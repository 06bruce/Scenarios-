import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Reports = () => {
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const res = await API.get('/borrowings');
        setBorrowings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBorrowings();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Monthly Borrowing Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-3 border">Student Name</th>
                <th className="p-3 border">Book Title</th>
                <th className="p-3 border">Borrow Date</th>
                <th className="p-3 border">Return Date</th>
                <th className="p-3 border">Fine (RWF)</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.length > 0 ? (
                borrowings.map((b) => (
                  <tr key={b._id} className="table-row-striped border-b">
                    <td className="p-3 border">
                      {b.studentId ? `${b.studentId.firstName} ${b.studentId.lastName}` : 'N/A'}
                    </td>
                    <td className="p-3 border">
                      {b.bookId ? b.bookId.title : 'N/A'}
                    </td>
                    <td className="p-3 border">
                      {new Date(b.borrowDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 border">
                      {new Date(b.returnDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 border font-semibold">
                      {b.fine.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500 italic">No records found</td>
                </tr>
              )}
            </tbody>
            {borrowings.length > 0 && (
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td colSpan="4" className="p-3 border text-right">Total Fines:</td>
                  <td className="p-3 border">
                    {borrowings.reduce((sum, b) => sum + (b.fine || 0), 0).toLocaleString()} RWF
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
