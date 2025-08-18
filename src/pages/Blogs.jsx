import Header from '../components/Header';
import Footer from '../components/Footer';
import EasyNav from '../components/EasyNav';
import SimpleHeroSection from '../components/SimpleHeroSection';

const About = () => {
  // Define navigation items for your portfolio
  const homeNavItems = [
    { name: 'Header', id: 'header', color: '#00bcff' },
    { name: 'Hero', id: 'hero', color: '#00bcff' },
    { name: 'Blogs', id: 'blogs', color: '#00bcff' },
    { name: 'Footer', id: 'footer', color: '#00bcff' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Make sure each component receives and uses the id prop */}
      <div id="header">
        <Header />
      </div>
      
      <div id="hero">
<SimpleHeroSection 
  pageName="Blogs" 
/>
</div>      
      <dvi id="blogs">
<div className="bg-[#1d2839] py-12 border-t border-gray-700 h-[500px] flex items-center justify-center">
  <h2 className="text-white text-2xl font-semibold">
    Blogs are not available right now
  </h2>
</div>

      </dvi>
      
<div id="footer">
<Footer />
</div>
      
      {/* EasyNav Component with navigation items */}
      <EasyNav navItems={homeNavItems} />
    </div>
  );
};

export default About;