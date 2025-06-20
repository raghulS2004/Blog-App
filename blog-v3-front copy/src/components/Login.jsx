import React, { useState } from 'react';
import '../components/css/login.css';

const Login = ({ url, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Replace with your actual login API endpoint
      const response = await fetch(url + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
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
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 