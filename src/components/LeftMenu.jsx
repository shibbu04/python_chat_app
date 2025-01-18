import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCircle } from 'react-icons/fa';

function LeftMenu({ isOpen }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('your-django-domain.com/api/users/');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      className={`fixed md:static left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0'
      } overflow-hidden`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Users</h2>
        <div className="space-y-2">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                selectedUser === user.id
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <FaUserCircle className="text-2xl" />
              <span className="flex-grow text-left font-medium">{user.username}</span>
              <FaCircle className="text-green-500 text-xs" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;