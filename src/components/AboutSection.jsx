import React from 'react';
import { Link } from "react-router-dom";


const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">About Me</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate full-stack developer with 5+ years of experience creating innovative web solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a dedicated full-stack developer who loves turning complex problems into simple, 
              beautiful designs. With expertise in modern web technologies, I create scalable 
              applications that deliver exceptional user experiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>

            <div className="flex flex-wrap gap-4">
            
             <Link 
    to="/about#Experience" 
    className="bg-gray-700 px-4 py-2 rounded-lg flex items-center"
  >
    <span className="text-indigo-400 font-semibold">5+</span>
    <span className="text-gray-300 ml-2">Years Experience</span>
  </Link>

  <Link 
    to="/projects" 
    className="bg-gray-700 px-4 py-2 rounded-lg flex items-center"
  >
    <span className="text-indigo-400 font-semibold">50+</span>
    <span className="text-gray-300 ml-2">Projects Completed</span>
  </Link>

            </div>
          </div>
          
          <div className="bg-gray-700 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-400">Technical Skills</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#00bcff' }}>Languages:</h4>
                <p className="text-gray-100 text-lg leading-relaxed">HTML, CSS, JavaScript, PHP, TypeScript</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#00bcff' }}>Frameworks & Libraries:</h4>
                <p className="text-gray-100 text-lg leading-relaxed">jQuery, React.js, Next.js, Bootstrap, Tailwind CSS, GSAP, Framer Motion</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#00bcff' }}>CMS:</h4>
                <p className="text-gray-100 text-lg leading-relaxed">WordPress (Theme & Plugin Customization, ACF, WooCommerce, Elementor, Divi, etc.)</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#00bcff' }}>Databases:</h4>
                <p className="text-gray-100 text-lg leading-relaxed">SQL, MySQL</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#00bcff' }}>Tools:</h4>
                <p className="text-gray-100 text-lg leading-relaxed">Figma, Notion, Microsoft Teams, Slack, GitHub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;