
import {  ExternalLink,  Mail} from 'lucide-react';
import logo from '../assets/logo/HasanWeb.png'
const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Logo and Description */}
          <div className="text-center md:text-left">
                        <a href='/'>
            <img src={logo} alt="HasanWeb" style={{width: '200px'}} />
                        </a>
            <p className="text-gray-400 mb-6 mt-[20px] max-w-md">
              From code to clicks. We build, automate, and innovate your web success.
            </p>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Mail size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <ExternalLink size={24} />
              </a>
            </div>
          </div>

          {/* Right Side - Navigation */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-400 hover:text-sky-400 transition-colors">Home</a>
              <a href="#about" className="text-gray-400 hover:text-sky-400 transition-colors">About</a>
              <a href="#projects" className="text-gray-400 hover:text-sky-400 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-sky-400 transition-colors">Contact</a>
              <a href="#blog" className="text-gray-400 hover:text-sky-400 transition-colors">Blog</a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Hasan Dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;