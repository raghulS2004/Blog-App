import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, user, setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const API_URL = process.env.REACT_APP_API_URL || 'https://blog-app-drgj.onrender.com';

  useEffect(() => {
    const verifySession = async () => {
      try {
        console.log('🔍 Verifying session for protected route...');
        const response = await axios.get(`${API_URL}/current_user`, { 
          withCredentials: true 
        });
        
        console.log('🔍 Session verification response:', response.data);
        
        if (response.data.user) {
          console.log('✅ Session verified, user authenticated:', response.data.user.username);
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          console.log('❌ No user in session verification response');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('❌ Session verification failed:', error.response?.data || error.message);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // If we already have a user in state, verify the session is still valid
    if (user) {
      verifySession();
    } else {
      // If no user in state, still verify session in case there's a valid session cookie
      verifySession();
    }
  }, [user, setUser, API_URL]);

  if (isLoading) {
    return (
      <div className="spinner-load">
        <div>Verifying authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ User authenticated, rendering protected content');
  return children;
};

export default ProtectedRoute; 