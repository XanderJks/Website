import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const { user, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-bold tracking-wider gradient-text group-hover:scale-105 transition-transform">
                {'>'}_ JonkersAI
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 tracking-wider text-sm font-medium">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                {'>'} Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                {'>'} Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                {'>'} Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/book-demo" className="btn-primary text-sm group">
                {'>'} Boek Demo
              </Link>
              {isAdmin && (
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                  {'>'} Admin
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
              {user && (
                <button 
                  onClick={handleSignOut}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              )}
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
          <Link 
            to="/" 
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            {'>'} Home
          </Link>
          <Link 
            to="/blog" 
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            {'>'} Blog
          </Link>
          <Link 
            to="/contact" 
            className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            {'>'} Contact
          </Link>
          <Link 
            to="/book-demo" 
            className="block px-4 py-3 glass-strong rounded-xl flex items-center font-medium group"
            onClick={() => setIsMenuOpen(false)}
          >
            {'>'} Boek Demo
          </Link>
          {isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className="block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {'>'} Admin
            </Link>
          )}
          {user && (
            <button 
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}