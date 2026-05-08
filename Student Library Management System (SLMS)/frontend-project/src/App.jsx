import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Students from './pages/Students';
import Books from './pages/Books';
import Borrowing from './pages/Borrowing';
import Reports from './pages/Reports';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn');
  return loggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
            <Route path="/borrowing" element={<ProtectedRoute><Borrowing /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/students" />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Student Library Management System (SLMS)
        </footer>
      </div>
    </Router>
  );
}

export default App;
