import React from 'react';
import { Link } from "react-router-dom";

const SimpleHeroSection = ({ 
  pageName = "Page Name"
}) => {
  return (
    <section className="relative h-[500px] w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full px-4">
        
        {/* Main Header - Perfectly Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent text-center pb-[10px]">
            {pageName}
          </h1>
        </div>
        
        {/* Breadcrumb Navigation - 50px below page name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mt-32">
            <nav className="flex items-center space-x-2 text-[#9ca3af]">
              <Link 
                to="/" 
                className="text-[#38bdf8] hover:text-[#84cc16] transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <span className="text-[#9ca3af]">&gt;</span>
              <span className="text-[#e5e7eb] font-medium">
                {pageName}
              </span>
            </nav>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SimpleHeroSection;