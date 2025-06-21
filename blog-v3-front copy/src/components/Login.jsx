import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/css/login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('🔍 Attempting login for user:', username);

      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true } // ⚠️ Required for session cookies to persist
      );

      console.log('🔍 Login response:', response.data);

      if (response.data.user) {
        console.log('✅ Login successful:', response.data.user.username);
        setUser(response.data.user);

        // ✅ Wait for cookie/session to be established
        setTimeout(() => navigate('/compose'), 200);
      } else {
        console.log('❌ No user data returned');
        setError('Login failed: No user data received.');
      }
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2 className="loginheader">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="login-username">Username</label>
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <div className="lowerprompt">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
