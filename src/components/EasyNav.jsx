import React, { useState } from 'react';
import { Pin, X } from 'lucide-react';
const EasyNav = ({ navItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Default nav items if none provided
  const defaultNavItems = [
    { name: 'Home', id: 'home', color: '#00bcff' },
    { name: 'About', id: 'about', color: '#00bcff' },
    { name: 'Projects', id: 'projects', color: '#00bcff' },
    { name: 'Contact', id: 'contact', color: '#00bcff' },
    { name: 'Blog', id: 'blog', color: '#00bcff' }
  ];

  const items = navItems.length > 0 ? navItems : defaultNavItems;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePin = () => {
    setIsPinned(!isPinned);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPinned(false);
  };

  const handleNavClick = (id) => {
    // Smooth scroll to section - automatically add #
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Auto close if not pinned
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Main Circle Button - Smooth transition when EasyNav opens/closes */}
      <div 
        className={`fixed right-6 z-50 transition-all duration-700 ease-in-out ${
          isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        style={{ top: '100px' }}
      >
        <div
          className={`relative w-[55px] h-[55px] rounded-full cursor-pointer transition-all duration-500 transform hover:scale-105 bg-gray-800 bg-opacity-80 ${
            isHovered ? 'shadow-2xl' : 'shadow-lg'
          }`}
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            boxShadow: isHovered 
              ? '0 0 30px rgba(0, 188, 255, 0.6), 0 0 60px rgba(0, 188, 255, 0.4)' 
              : '0 10px 25px rgba(0, 0, 0, 0.3)'
          }}
        >
            {/* SVG Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
<img
  src="/icons/compass.svg"
  alt="navigator"
/>

            </div>

            {/* Hover Text */}
            {isHovered && (
              <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 opacity-0 animate-fade-in">
                <span className="text-sm font-medium" style={{ color: '#00bcff' }}>
                  Easy Navigator
                </span>
                {/* Arrow */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-l-4 border-l-gray-800 border-y-4 border-y-transparent"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      {/* Navigation Panel */}
      <div
        className={`fixed right-6 z-40 transition-all duration-700 ease-in-out transform ${
          isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
        }`}
        style={{ 
          top: '100px',
          width: '350px',
          minHeight: '200px'
        }}
      >
          {isOpen && (
          <div className="bg-gray-800 bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              {/* Pin Button (Left) */}
              <button
                onClick={handlePin}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isPinned 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                <Pin 
                  size={16} 
                  className={`text-white transition-transform duration-200 ${
                    isPinned ? 'rotate-45' : ''
                  }`} 
                />
              </button>

              {/* Title */}
              <h3 
                className="text-center flex-1 font-medium"
                style={{ 
                  color: '#00bcff',
                  fontSize: '20px',
                  fontWeight: 500
                }}
              >
                Easy Navigator
              </h3>

              {/* Close Button (Right) */}
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors duration-200"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="p-4">
              <div className="space-y-2">
                {items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-200 group"
                  >
                    <span
                      className="font-medium transition-colors duration-200 group-hover:scale-105 inline-block"
                      style={{
                        color: item.color || '#00bcff',
                        fontSize: '16px'
                      }}
                    >
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for auto-close */}
      {isOpen && !isPinned && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

// Example usage component showing how to use EasyNav with different pag
export default EasyNav;