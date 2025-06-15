import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Tag,
  Home,
  LogOut,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  return (
    <div className="relative z-10 flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900/70 border-r border-white/10 p-5 hidden md:block">
        <div className="mb-8">
          <Link to="/" className="text-xl font-bold tracking-wide">
            &gt;_ JonkersAI
          </Link>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>
        
        <nav className="space-y-1">
          <Link
            to="/admin/dashboard"
            className={`flex items-center px-4 py-3 rounded-md ${
              isActive('/admin/dashboard')
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={18} className="mr-3" />
            Dashboard
          </Link>
          
          <Link
            to="/admin/posts"
            className={`flex items-center px-4 py-3 rounded-md ${
              isActive('/admin/posts')
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <FileText size={18} className="mr-3" />
            Posts
          </Link>
          
          <Link
            to="/admin/categories"
            className={`flex items-center px-4 py-3 rounded-md ${
              isActive('/admin/categories')
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Tag size={18} className="mr-3" />
            Categories
          </Link>
          
          <Link
            to="/admin/tags"
            className={`flex items-center px-4 py-3 rounded-md ${
              isActive('/admin/tags')
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Tag size={18} className="mr-3" />
            Tags
          </Link>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center mb-4 px-4 py-2 text-gray-300 hover:bg-white/5 rounded-md"
          >
            <Home size={18} className="mr-3" />
            View Site
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-md"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-b border-white/10 z-20 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wide">
            &gt;_ JonkersAI
          </Link>
          <button className="text-white p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Hidden by default */}
      <div className="hidden fixed inset-0 bg-black/90 z-30 pt-16">
        <nav className="p-5 space-y-2">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-3 rounded-md text-white hover:bg-white/10"
          >
            <LayoutDashboard size={18} className="mr-3 inline-block" />
            Dashboard
          </Link>
          
          <Link
            to="/admin/posts"
            className="block px-4 py-3 rounded-md text-white hover:bg-white/10"
          >
            <FileText size={18} className="mr-3 inline-block" />
            Posts
          </Link>
          
          <Link
            to="/admin/categories"
            className="block px-4 py-3 rounded-md text-white hover:bg-white/10"
          >
            <Tag size={18} className="mr-3 inline-block" />
            Categories
          </Link>
          
          <Link
            to="/admin/tags"
            className="block px-4 py-3 rounded-md text-white hover:bg-white/10"
          >
            <Tag size={18} className="mr-3 inline-block" />
            Tags
          </Link>
          
          <div className="pt-4 mt-4 border-t border-white/10">
            <Link
              to="/"
              className="block px-4 py-3 rounded-md text-white hover:bg-white/10"
            >
              <Home size={18} className="mr-3 inline-block" />
              View Site
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-md text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={18} className="mr-3 inline-block" />
              Logout
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8 md:py-8 md:px-10 pt-20 md:pt-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};