import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Navbar from './components/Navbar';
import LeftMenu from './components/LeftMenu';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 992 && width <= 1600) {
        setScale(0.9);
      } else if (width >= 700 && width <= 767) {
        setScale(0.8);
      } else if (width >= 600 && width < 700) {
        setScale(0.75);
      } else if (width <= 600) {
        setScale(0.5);
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }} className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem-5rem)] pt-16 relative">
        <button
          className="fixed left-4 top-20 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <LeftMenu isOpen={isMenuOpen} />
        <MainContent />
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
}

export default App;