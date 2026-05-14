import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('loggedIn');

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">BTBS</Link>
        <div className="space-x-4 flex items-center">
          {loggedIn ? (
            <>
              <Link to="/passengers" className="hover:text-blue-200">Passengers</Link>
              <Link to="/routes" className="hover:text-blue-200">Routes</Link>
              <Link to="/tickets" className="hover:text-blue-200">Tickets</Link>
              <Link to="/reports" className="hover:text-blue-200">Reports</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-200">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
