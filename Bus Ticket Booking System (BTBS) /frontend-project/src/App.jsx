import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Passengers from './pages/Passengers';
import RoutesPage from './pages/Routes';
import Tickets from './pages/Tickets';
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
            <Route path="/passengers" element={<ProtectedRoute><Passengers /></ProtectedRoute>} />
            <Route path="/routes" element={<ProtectedRoute><RoutesPage /></ProtectedRoute>} />
            <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/passengers" />} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Bus Ticket Booking System (BTBS)
        </footer>
      </div>
    </Router>
  );
}

export default App;
