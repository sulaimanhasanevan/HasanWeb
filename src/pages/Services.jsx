import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import EasyNav from '../components/EasyNav';

const Services = () => {
  // Define navigation items for your portfolio
  const homeNavItems = [
    { name: 'Header', id: 'header', color: '#00bcff' },
    { name: 'Hero', id: 'hero', color: '#00bcff' },
    { name: 'About', id: 'about', color: '#00bcff' },
    { name: 'Projects', id: 'projects', color: '#00bcff' },
    { name: 'Contact', id: 'contact', color: '#00bcff' },
    { name: 'Footer', id: 'footer', color: '#00bcff' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Make sure each component receives and uses the id prop */}
      <div id="header">
        <Header />
      </div>
      
      <div id="hero">
        <HeroSection />
      </div>
      
      <div id="about">
        <AboutSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>
      
      <div id="footer">
        <Footer />
      </div>
      
      {/* EasyNav Component with navigation items */}
      <EasyNav navItems={homeNavItems} />
    </div>
  );
};

export default Services;