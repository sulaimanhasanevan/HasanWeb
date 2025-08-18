import React, { useState,} from 'react';
import { Menu, X } from 'lucide-react';



const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-gray-800/90 backdrop-blur-md z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-indigo-400">
            <a href='/'>
<img src='/logos/hasanweb.png' alt="HasanWeb" style={{width: '200px'}} />
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/about" className="text-gray-300 hover:text-sky-400 transition-colors">About</a>
            <a href="/contact" className="text-gray-300 hover:text-sky-400 transition-colors">Contact</a>
            <a href="/blogs" className="text-gray-300 hover:text-sky-400 transition-colors">Blogs</a>
<a 
  href="/projects" 
  className="bg-lime-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-lime-400 transition-colors font-medium inline-block text-center no-underline"
>
  Projects
</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-sky-400">Home</a>
              <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-sky-400">About</a>
              <a href="#projects" className="block px-3 py-2 text-gray-300 hover:text-sky-400">Projects</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-sky-400">Contact</a>
              <a href="#blog" className="block px-3 py-2 text-gray-300 hover:text-sky-400">Blog</a>
              <button className="w-full text-left px-3 py-2 bg-lime-500 text-gray-900 rounded-lg hover:bg-lime-400 transition-colors font-medium">
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;