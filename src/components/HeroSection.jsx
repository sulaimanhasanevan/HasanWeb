import React from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Mail, Phone, MapPin, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";


const HeroSection = () => {
  const technologies = [
    { 
      name: 'HTML', 
      color: 'from-orange-400 to-orange-600', 
      bgColor: 'bg-orange-500/20', 
      shadow: 'shadow-orange-500/50', 
      icon: 'icons/html.png' // Use imported image
    },
    { 
      name: 'Tailwind', 
      color: 'from-cyan-400 to-cyan-600', 
      bgColor: 'bg-cyan-500/20', 
      shadow: 'shadow-cyan-500/50', 
      icon: '/icons/tailwind.png' 
    },
    { 
      name: 'JavaScript', 
      color: 'from-yellow-400 to-yellow-600', 
      bgColor: 'bg-yellow-500/20', 
      shadow: 'shadow-yellow-500/50', 
      icon: "/icons/javascript.png" 
    },
    { 
      name: 'React', 
      color: 'from-blue-400 to-blue-600', 
      bgColor: 'bg-blue-500/20', 
      shadow: 'shadow-blue-500/50', 
      icon: "/icons/react.png" 
    },
    { 
      name: 'PHP', 
      color: 'from-purple-400 to-purple-600', 
      bgColor: 'bg-purple-500/20', 
      shadow: 'shadow-purple-500/50', 
      icon: '/icons/php.png' 
    },
    { 
      name: 'WordPress', 
      color: 'from-blue-600 to-blue-800', 
      bgColor: 'bg-blue-600/20', 
      shadow: 'shadow-blue-600/50', 
      icon: '/icons/wordpress.png' 
    },
    { 
      name: 'Spring Boot', 
      color: 'from-green-400 to-green-600', 
      bgColor: 'bg-green-500/20', 
      shadow: 'shadow-green-500/50', 
      icon: '/icons/springboot.png' 
    }
  ];

  // Configuration for easy height/width adjustments
  const config = {
    // Main container dimensions
    containerWidth: 'w-80',    // Change to w-96, w-72, etc.
    containerHeight: 'h-80',   // Change to h-96, h-72, etc.
    
    // Technology circle dimensions
    techCircleSize: 'w-10 h-10', // Change to w-12 h-12, w-8 h-8, etc.
    techIconSize: 24,          // Icon size in pixels (width and height)
    
    // Orbit radius (distance from center) - Set to 200px
    orbitRadius: 200,          // Set to 200px as requested
    
    // Central image styling
    centralImageMaxWidth: '93%',
    centralImageBottom: '7px',
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - 60% width */}
          <div className="md:col-span-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Sulaiman Hasan
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 mb-8 leading-relaxed">
              Front End Developer
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Crafting digital experiences with passion and precision
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/projects" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
              >
                View My Work
              </Link>
              <a 
                href="/file/sulaimanresume.pdf" 
                download="sulaimanresume.pdf"
                className="border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-gray-900 px-8 py-3 rounded-lg transition-colors font-medium text-lg"
              >
                Download Resume
              </a>
            </div>
          </div>
                   
          {/* Right side - 40% width with animated tech circles */}
          <div className="md:col-span-1 flex justify-center">
            <div className={`relative ${config.containerWidth} ${config.containerHeight} flex items-center justify-center`}>
              {/* Central placeholder circle */}
              <div className={`${config.containerWidth} ${config.containerHeight} bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 backdrop-blur-sm`}>
                <img 
                  src="/image/codingwizard.png" 
                  alt="Coding Wizard" 
                  style={{
                    maxWidth: config.centralImageMaxWidth,
                    height: "auto",
                    bottom: config.centralImageBottom,
                    display: "block",
                    position: "relative"
                  }} 
                />
              </div>
              
              {/* Animated technology circles - orbiting 60px from center */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                {technologies.map((tech, index) => {
                  const angle = (index * 360) / technologies.length;
                  const radius = config.orbitRadius; // Now 60px
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  // Calculate half the size of tech circle for proper centering
                  const halfSize = 20; // Since w-10 h-10 = 40px (10 * 4px), half is 20px
                  
                  return (
                    <div
                      key={tech.name}
                      className={`absolute ${config.techCircleSize} rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 ${tech.bgColor} ${tech.shadow} shadow-lg transition-all duration-300 hover:scale-110`}
                      style={{
                        left: `calc(50% + ${x}px - ${halfSize}px)`,
                        top: `calc(50% + ${y}px - ${halfSize}px)`,
                        boxShadow: `0 0 20px ${tech.shadow.includes('orange') ? '#f97316' : 
                                                tech.shadow.includes('cyan') ? '#06b6d4' : 
                                                tech.shadow.includes('yellow') ? '#eab308' : 
                                                tech.shadow.includes('blue-6') ? '#2563eb' : 
                                                tech.shadow.includes('blue') ? '#3b82f6' : 
                                                tech.shadow.includes('purple') ? '#a855f7' : 
                                                '#22c55e'}33, 0 4px 15px rgba(0,0,0,0.2)`
                      }}
                      title={tech.name}
                    >
                      <img 
                        src={tech.icon} 
                        alt={tech.name}
                        width={config.techIconSize}
                        height={config.techIconSize}
                        className="object-contain"
                        style={{ 
                          animation: 'spin 20s linear infinite reverse',
                          filter: 'brightness(1.2)' // Optional: make icons brighter
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
                 
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;