import React, { useState, useRef } from 'react';
import { Mail, Phone, CheckCircle, AlertCircle, Send } from 'lucide-react';

// Mock HCaptcha component for this demo - replace with real HCaptcha in your code
const HCaptcha = ({ onVerify, onExpire, onError, theme, sitekey }) => {
  const [verified, setVerified] = useState(false);
  
  const handleVerify = () => {
    if (!verified) {
      setVerified(true);
      onVerify('real-captcha-token-here');
    } else {
      setVerified(false);
      onExpire();
    }
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleVerify}
        className={`px-6 py-3 rounded-lg transition-colors ${
          verified 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
        }`}
      >
        {verified ? '✓ Verified' : 'Click to verify (Demo)'}
      </button>
    </div>
  );
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleCaptchaVerify = (token) => {
    setCaptchaToken(token);
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  const handleCaptchaError = (err) => {
    console.error('hCaptcha Error:', err);
    setCaptchaToken(null);
    setStatus({ 
      type: 'error', 
      message: 'Captcha verification failed. Please try again.' 
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your name";
    if (!form.email.trim()) return "Please enter your email";
    if (!form.message.trim()) return "Please enter your message";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Please enter a valid email";
    
    if (!captchaToken) return "Please complete the captcha verification";
    
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      console.log('Sending to server:', {
        name: form.name, 
        email: form.email, 
        message: form.message,
        captchaToken: captchaToken 
      });
      
      const response = await fetch('https://hasanweb-backend1.onrender.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          captchaToken: captchaToken
        })
      });

      console.log('Response status:', response.status);

      // Get the response data (both success and error cases)
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
        setForm({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        // Reset the captcha
        if (captchaRef.current) {
          captchaRef.current.resetCaptcha();
        }
      } else {
        // Show the actual error message from server
        throw new Error(data.message || `Server error (${response.status})`);
      }
    } catch (error) {
      console.error('Request error:', error);
      
      let errorMessage = 'Failed to send message. ';
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        errorMessage += 'Network connection error. Please check your internet connection and try again.';
      } else if (error.message.includes('NetworkError')) {
        errorMessage += 'Network connection error. Please check your internet connection.';
      } else if (error.message) {
        // Show the actual server error message
        errorMessage += error.message;
      } else {
        errorMessage += 'Unknown error occurred. Please try again or contact me directly at sulaimanhasanevan@gmail.com';
      }
      
      setStatus({ 
        type: 'error', 
        message: errorMessage
      });

      // Reset captcha on error
      setCaptchaToken(null);
      if (captchaRef.current && captchaRef.current.resetCaptcha) {
        captchaRef.current.resetCaptcha();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const StatusIcon = () => {
    switch (status.type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'loading': return (
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      );
      default: return null;
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your next project? Let's create something amazing together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <Mail size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Email</h3>
                <a 
                  href="mailto:sulaimanhasanevan@gmail.com"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  sulaimanhasanevan@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Phone</h3>
                <a 
                  href="tel:+8801400311710"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  +880 1400311710
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">LinkedIn</h3>
                <a 
                  href="https://linkedin.com/in/sulaimane" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  @sulaimane
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project, questions, or how I can help you..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
                disabled={isLoading}
              ></textarea>
            </div>
            
            {/* hCaptcha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Security Verification *
              </label>
              <HCaptcha
                ref={captchaRef}
                sitekey="95f0f6f4-0a9c-4bbc-b9d6-9296830ebe52"
                onVerify={handleCaptchaVerify}
                onExpire={handleCaptchaExpire}
                onError={handleCaptchaError}
                theme="dark"
              />
            </div>
            
            <button
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                isLoading || !captchaToken
                  ? 'bg-gray-600 cursor-not-allowed opacity-60' 
                  : 'bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-lime-500/25'
              } text-gray-900`}
              onClick={handleSubmit}
              disabled={isLoading || !captchaToken}
              title={!captchaToken ? 'Please complete the captcha verification first' : ''}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>
            
            {/* Status Message */}
            {status.message && (
              <div className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 ${
                status.type === 'success' ? 'bg-green-900/50 border border-green-700/50 backdrop-blur-sm' :
                status.type === 'error' ? 'bg-red-900/50 border border-red-700/50 backdrop-blur-sm' :
                'bg-blue-900/50 border border-blue-700/50 backdrop-blur-sm'
              }`}>
                <StatusIcon />
                <p className={`text-sm leading-relaxed ${
                  status.type === 'success' ? 'text-green-300' :
                  status.type === 'error' ? 'text-red-300' :
                  'text-blue-300'
                }`}>
                  {status.message}
                </p>
              </div>
            )}

            <div className="text-xs text-gray-400 text-center">
              <p>Your information is secure and will only be used to respond to your inquiry.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;