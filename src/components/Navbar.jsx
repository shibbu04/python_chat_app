import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your-django-domain.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setIsLoggedIn(true);
        const data = await response.json();
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold bg-white text-transparent bg-clip-text">ChatApp</div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors duration-200">
                <FaHome className="text-lg" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors duration-200">
                <FaUser className="text-lg" />
                <span>Profile</span>
              </a>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem('token');
                }}
                className="flex items-center space-x-2 hover:text-indigo-200 transition-colors duration-200"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleLogin} className="flex items-center space-x-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors duration-200"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;