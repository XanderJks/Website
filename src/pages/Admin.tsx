import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

export function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in and is admin, redirect to dashboard
  React.useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      console.log('Submitting login form with email:', email);
      
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Login error:', error);
        setError('Invalid email or password. Please try again.');
      } else {
        console.log('Login successful, redirecting to dashboard');
        // Successfully signed in, redirect happens in the useEffect above
      }
    } catch (err) {
      console.error('Sign in unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-4">
      <Helmet>
        <title>Admin Login | JonkersAI</title>
      </Helmet>
      
      <div className="w-full max-w-md">
        <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-white/20 focus:border-indigo-500 outline-none transition-colors text-white rounded"
                placeholder="your-email@jonkersai.nl"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-white/20 focus:border-indigo-500 outline-none transition-colors text-white rounded"
                placeholder="••••••••"
              />
            </div>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 p-3 rounded text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Access restricted to authorized personnel only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}