import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Equipment from './pages/Equipment';
import Rentals from './pages/Rentals';
import Reports from './pages/Reports';

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
            <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            <Route path="/equipment" element={<ProtectedRoute><Equipment /></ProtectedRoute>} />
            <Route path="/rentals" element={<ProtectedRoute><Rentals /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/clients" />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Equipment Rental Management System (ERMS)
        </footer>
      </div>
    </Router>
  );
}

export default App;
