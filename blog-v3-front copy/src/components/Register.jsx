import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/css/login.css';

const Register = ({ setUser }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'https://blog-app-drgj.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('🔍 Attempting registration for user:', username);
      const response = await axios.post(`${API_URL}/register`, {
        name,
        username,
        mobile,
        password
      }, {
        withCredentials: true
      });
      
      console.log('🔍 Registration response:', response.data);
      if (response.data.user) {
        console.log('✅ Registration successful, setting user:', response.data.user.username);
        setUser(response.data.user);
        window.location.href = '/compose';
      } else {
        console.log('❌ No user in registration response');
        setError('Registration failed - no user data received');
      }
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="main-container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="form-container" style={{ width: '100%', maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(67,104,80,0.10), 0 1.5px 4px rgba(146,26,64,0.04)', padding: '2.5rem 2rem 2rem 2rem' }}>
        <h2 className="loginheader" style={{ textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px' }}>Register</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <label htmlFor="register-name" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ marginBottom: 12 }}
          />
          <label htmlFor="register-username" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Username</label>
          <input
            id="register-username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ marginBottom: 12 }}
          />
          <label htmlFor="register-mobile" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Mobile</label>
          <input
            id="register-mobile"
            type="tel"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            required
            style={{ marginBottom: 12 }}
            pattern="[0-9]{10,15}"
            maxLength={15}
          />
          <label htmlFor="register-password" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ marginBottom: 12 }}
          />
          <button type="submit" style={{ margin: '1.2rem auto 0 auto', width: '60%' }}>Register</button>
          {error && <div className="error-message" style={{ marginTop: 8 }}>{error}</div>}
        </form>
        <div className="lowerprompt" style={{ marginTop: 24 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 