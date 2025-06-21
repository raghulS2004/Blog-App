import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/css/login.css';

const Login = ({ url, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('🔍 Attempting login for user:', username);
      const response = await axios.post('/login', {
        username,
        password
      });
      
      console.log('🔍 Login response:', response.data);
      if (response.data.user) {
        console.log('✅ Login successful, setting user:', response.data.user.username);
        setUser(response.data.user);
      } else {
        console.log('❌ No user in login response');
        setError('Login failed - no user data received');
      }
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="main-container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="form-container" style={{ width: '100%', maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(67,104,80,0.10), 0 1.5px 4px rgba(146,26,64,0.04)', padding: '2.5rem 2rem 2rem 2rem' }}>
        <h2 className="loginheader" style={{ textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <label htmlFor="login-username" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Username</label>
          <input
            id="login-username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ marginBottom: 12 }}
          />
          <label htmlFor="login-password" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ marginBottom: 12 }}
          />
          <button type="submit" style={{ margin: '1.2rem auto 0 auto', width: '60%' }}>Login</button>
          {error && <div className="error-message" style={{ marginTop: 8 }}>{error}</div>}
        </form>
        <div className="lowerprompt" style={{ marginTop: 24 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 