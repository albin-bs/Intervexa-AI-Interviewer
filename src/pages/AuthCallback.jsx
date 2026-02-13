import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserProfile } from '../services/authService';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the current user
        const { user } = await getCurrentUser();
        
        if (!user) {
          toast.error('Authentication failed');
          navigate('/login');
          return;
        }

        // Store user info in localStorage
        localStorage.setItem('accessToken', user.id);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userEmail', user.email || '');

        toast.success('Welcome!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Something went wrong. Please try again.');
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <p className="text-slate-400">Completing sign in...</p>
      </div>
    </div>
  );
}
