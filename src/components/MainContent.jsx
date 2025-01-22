import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPlus, FaCalculator } from 'react-icons/fa';

function MainContent() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sum, setSum] = useState(null);
  const [numbers, setNumbers] = useState({ num1: '', num2: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const AWS_API_URL = import.meta.env.VITE_AWS_API_URL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAddNumbers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${AWS_API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num1: parseFloat(numbers.num1),
          num2: parseFloat(numbers.num2)
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSum(data.result);
      } else {
        throw new Error(data.error || 'Failed to add numbers');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error adding numbers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Content = reader.result.split(',')[1];
        
        const response = await fetch(`${AWS_API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fileContent: base64Content,
            fileName: file.name
          })
        });

        const data = await response.json();
        
        if (data.success) {
          alert(`File uploaded successfully! URL: ${data.file_url}`);
        } else {
          throw new Error(data.error || 'Failed to upload file');
        }
      };

      reader.onerror = () => {
        throw new Error('Failed to read file');
      };
    } catch (error) {
      setError(error.message);
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <main className="flex-grow p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Chat</h2>
          </div>
          {selectedUser ? (
            <>
              <div className="h-[calc(100vh-24rem)] overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-4 ${
                          msg.sender === 'me'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <span className="text-xs opacity-75 mt-1 block">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={() => {/* Send message logic */}}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>Send</span>
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">AWS Lambda Functions</h2>
          </div>
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <FaCalculator />
                <span>Add Numbers</span>
              </h3>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={numbers.num1}
                  onChange={(e) => setNumbers(prev => ({ ...prev, num1: e.target.value }))}
                  className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="First number"
                  disabled={isLoading}
                />
                <input
                  type="number"
                  value={numbers.num2}
                  onChange={(e) => setNumbers(prev => ({ ...prev, num2: e.target.value }))}
                  className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Second number"
                  disabled={isLoading}
                />
                <button
                  onClick={handleAddNumbers}
                  className={`bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add'}
                </button>
              </div>
              {sum !== null && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg font-semibold text-gray-800">Result: {sum}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <FaPlus />
                <span>Upload File to S3</span>
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  disabled={isLoading}
                  ref={fileInputRef}
                />
                {isLoading && <span className="text-gray-600">Uploading...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
