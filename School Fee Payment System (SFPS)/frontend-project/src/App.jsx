import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Students from './pages/Students';
import FeeStructure from './pages/FeeStructure';
import Payments from './pages/Payments';
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
            <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
            <Route path="/feestructures" element={<ProtectedRoute><FeeStructure /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/students" />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} School Fee Payment System (SFPS)
        </footer>
      </div>
    </Router>
  );
}

export default App;
