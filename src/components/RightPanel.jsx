import React from 'react';
import { FaUsers, FaClock, FaCircle } from 'react-icons/fa';

function RightPanel() {
  return (
    <div className="hidden lg:block w-80 p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Active Users</h2>
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <FaUsers className="text-indigo-600" />
            <span>Online Now</span>
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaCircle className="text-green-500 text-xs" />
              <span>John Doe</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaCircle className="text-green-500 text-xs" />
              <span>Jane Smith</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaCircle className="text-green-500 text-xs" />
              <span>Mike Johnson</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <FaClock className="text-indigo-600" />
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              <p className="font-medium">John Doe sent a message</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Jane Smith joined the chat</p>
              <p className="text-xs text-gray-500">5 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;