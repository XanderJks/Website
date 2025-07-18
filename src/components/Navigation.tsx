import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center group">
              <span className="text-2xl font-bold tracking-wider gradient-text group-hover:scale-105 transition-transform">
                SocialFlows
              </span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 tracking-wider text-sm font-medium">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Over Ons
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Prijzen
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('demo')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('demo')} className="btn-primary text-sm group">
                Start Nu
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-white hover:text-gray-300 transition-colors p-2"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-4 pt-2 pb-6 space-y-3 bg-black/80 backdrop-blur-sm border-t border-white/10">
          <button 
            onClick={() => scrollToSection('home')}
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
          >
            Over Ons
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('process')}
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
          >
            Proces
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
          >
            Prijzen
          </button>
          <button 
            onClick={() => scrollToSection('demo')}
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
          >
            Demo
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
          >
            Contact
          </button>
          <button 
            onClick={() => scrollToSection('demo')}
            className="block px-4 py-3 glass-strong rounded-xl flex items-center font-medium group"
          >
            Start Nu
          </button>
        </div>
      </div>
    </nav>
  );
}