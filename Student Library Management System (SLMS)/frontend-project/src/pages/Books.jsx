import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookId: '',
    title: '',
    author: '',
    category: '',
    quantity: ''
  });

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/books', formData);
      setFormData({
        bookId: '',
        title: '',
        author: '',
        category: '',
        quantity: ''
      });
      fetchBooks();
    } catch (err) {
      alert('Error adding book: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Book</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text" placeholder="Book ID" className="border p-2 rounded" required
            value={formData.bookId} onChange={(e) => setFormData({...formData, bookId: e.target.value})}
          />
          <input
            type="text" placeholder="Title" className="border p-2 rounded" required
            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input
            type="text" placeholder="Author" className="border p-2 rounded" required
            value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})}
          />
          <input
            type="text" placeholder="Category" className="border p-2 rounded" required
            value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          <input
            type="number" placeholder="Quantity" className="border p-2 rounded md:col-span-2" required
            value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})}
          />
          <button type="submit" className="btn-primary md:col-span-2 font-bold">Add Book</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Book Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="table-header">
                <th className="p-2 border">Book ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Author</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Qty</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="table-row-striped">
                  <td className="p-2 border">{book.bookId}</td>
                  <td className="p-2 border">{book.title}</td>
                  <td className="p-2 border">{book.author}</td>
                  <td className="p-2 border">{book.category}</td>
                  <td className="p-2 border">{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
