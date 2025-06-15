import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Admin } from './pages/Admin';
import { Dashboard } from './pages/admin/Dashboard';
import { PostsList } from './pages/admin/PostsList';
import { PostEditor } from './pages/admin/PostEditor';
import { CategoriesList } from './pages/admin/CategoriesList';
import { TagsList } from './pages/admin/TagsList';
import { AuthProvider } from './contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BookDemo } from './pages/BookDemo';
import { JsonLd, organizationSchema, serviceSchema, websiteSchema } from './components/JsonLd';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
          {/* Global Structured Data */}
          <JsonLd data={organizationSchema} />
          <JsonLd data={serviceSchema} />
          <JsonLd data={websiteSchema} />
          
          {/* Centered glow effects - reduced intensity */}
          <div className="fixed inset-0 z-0">
            {/* Main center glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[140px] animate-pulse"
              style={{ animationDuration: '6s' }}
            ></div>
            
            {/* Secondary center glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-purple-500/5 rounded-full blur-[130px] animate-pulse"
              style={{ animationDuration: '8s', animationDelay: '1s' }}
            ></div>

            {/* Accent glows */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-[30rem] h-[30rem] bg-blue-500/3 rounded-full blur-[120px] animate-pulse"
              style={{ animationDuration: '7s', animationDelay: '0.5s' }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[35rem] h-[35rem] bg-violet-500/3 rounded-full blur-[130px] animate-pulse"
              style={{ animationDuration: '9s', animationDelay: '1.5s' }}
            ></div>
          </div>
          
          {/* Animated background grid - reduced opacity */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-px bg-white animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          <Navigation />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/posts" element={<ProtectedRoute><PostsList /></ProtectedRoute>} />
            <Route path="/admin/posts/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
            <Route path="/admin/posts/edit/:id" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><CategoriesList /></ProtectedRoute>} />
            <Route path="/admin/tags" element={<ProtectedRoute><TagsList /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;