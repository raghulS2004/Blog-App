import React, { useState } from 'react';
import '../components/css/compose.css';

const Compose = ({ url, user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Replace with your actual compose API endpoint
      const response = await fetch(url + '/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, content, author: user?.name || user?.username })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Post created!');
        setTitle('');
        setContent('');
      } else {
        setError(data.error || 'Failed to create post');
      }
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="base-container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form className="compose-form" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(67,104,80,0.10), 0 1.5px 4px rgba(146,26,64,0.04)', padding: '2.5rem 2rem 2rem 2rem' }}>
        <h2 style={{ color: '#921A40', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px' }}>Compose New Post</h2>
        <label htmlFor="compose-title" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Title</label>
        <input
          id="compose-title"
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ marginBottom: 12 }}
        />
        <label htmlFor="compose-content" style={{ fontWeight: 600, color: '#921A40', marginBottom: 4 }}>Content</label>
        <textarea
          id="compose-content"
          placeholder="Write your post here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{ marginBottom: 12, minHeight: 120 }}
        />
        <button type="submit" style={{ margin: '1.2rem auto 0 auto', width: '60%' }}>Post</button>
        {error && <div className="alert" style={{ marginTop: 8 }}>{error}</div>}
        {success && <div className="alert-success" style={{ marginTop: 8 }}>{success}</div>}
      </form>
    </div>
  );
};

export default Compose; 