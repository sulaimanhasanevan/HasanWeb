import React from 'react';
import { Link } from "react-router-dom";

const SimpleHeroSection = ({ 
  pageName = "Page Name", 
  desktopBg = null, 
  mobileBg = null 
}) => {
  return (
    <section className="relative h-[500px] w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background */}
        {desktopBg && (
          <div 
            className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${desktopBg})`,
            }}
          ></div>
        )}
        
        {/* Mobile Background */}
        {mobileBg && (
          <div 
            className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${mobileBg})`,
            }}
          ></div>
        )}
        
        {/* Fallback background if no images provided */}
        {!desktopBg && !mobileBg && (
          <div className="absolute inset-0 bg-[#1f2937]"></div>
        )}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0d0d0d]/75"></div>
        
        {/* Blue accent overlay with opacity */}
        <div className="absolute inset-0 bg-[#00bcff]/25"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full px-4">
        
        {/* Main Header - Perfectly Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#e5e7eb] text-center">
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