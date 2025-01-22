import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCircle } from 'react-icons/fa';

function LeftMenu({ isOpen }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please login first');
        }

        const response = await fetch(`${API_URL}/api/users/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL]);

  return (
    <div
      className={`fixed md:static left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0'
      } overflow-hidden`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Users</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {users.length > 0 ? (
              users.map(user => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    selectedUser === user.id
                      ? 'bg-indigo-100 text-indigo-600 scale-105 shadow-md'
                      : 'hover:bg-gray-100 text-gray-700 hover:scale-102'
                  }`}
                >
                  <div className="relative">
                    <FaUserCircle className="text-2xl" />
                    <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs" />
                  </div>
                  <span className="flex-grow text-left font-medium">{user.username}</span>
                </button>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No users found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftMenu;
