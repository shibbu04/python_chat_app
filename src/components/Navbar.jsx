import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaHome, FaBars } from 'react-icons/fa';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowMobileMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
              ChatApp
            </span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <FaBars className="h-6 w-6" />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <a href="#" className="nav-link">
                <FaHome className="text-lg" />
                <span>Home</span>
              </a>
              <a href="#" className="nav-link">
                <FaUser className="text-lg" />
                <span>Profile</span>
              </a>
              <button onClick={handleLogout} className="nav-link text-pink-200">
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleLogin} className="flex items-center space-x-4">
              {error && (
                <div className="text-pink-200 text-sm">
                  {error}
                </div>
              )}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="auth-input"
                disabled={loading}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="auth-input"
                disabled={loading}
              />
              <button
                type="submit"
                className={`login-button ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="absolute top-16 left-0 right-0 bg-indigo-600 md:hidden">
            <div className="px-4 py-2 space-y-2">
              {isLoggedIn ? (
                <>
                  <a href="#" className="mobile-nav-link">
                    <FaHome className="text-lg" />
                    <span>Home</span>
                  </a>
                  <a href="#" className="mobile-nav-link">
                    <FaUser className="text-lg" />
                    <span>Profile</span>
                  </a>
                  <button onClick={handleLogout} className="mobile-nav-link text-pink-200 w-full">
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <form onSubmit={handleLogin} className="space-y-2">
                  {error && (
                    <div className="text-pink-200 text-sm">
                      {error}
                    </div>
                  )}
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="mobile-auth-input"
                    disabled={loading}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="mobile-auth-input"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="mobile-login-button"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
