import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Package, Truck, Users, FileText } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('loggedIn');

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-800">FSDS</Link>
            {loggedIn && (
              <>
                <Link to="/farmers" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Users size={18} />
                  <span>Farmers</span>
                </Link>
                <Link to="/supplies" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Package size={18} />
                  <span>Supplies</span>
                </Link>
                <Link to="/distributions" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Truck size={18} />
                  <span>Distributions</span>
                </Link>
                <Link to="/reports" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <FileText size={18} />
                  <span>Reports</span>
                </Link>
              </>
            )}
          </div>
          {loggedIn && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {localStorage.getItem('username')}</span>
              <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
