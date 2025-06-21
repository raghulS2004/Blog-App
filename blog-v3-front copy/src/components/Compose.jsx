import React, { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post(`${url}/compose`, {
        title,
        content
      }, {
        withCredentials: true // 🔐 Send session cookie
      });

      if (response.data.message) {
        setSuccess(response.data.message);
        setTitle('');
        setContent('');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setError('You are not authorized. Please log in again.');
      } else {
        setError('Failed to create post. Please try again.');
      }
    }
  };

  return (
    <div className="base-container">
      <form className="compose-form" onSubmit={handleSubmit}>
        <h2>Compose New Post</h2>

        <label htmlFor="compose-title">Title</label>
        <input
          id="compose-title"
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="compose-content">Content</label>
        <textarea
          id="compose-content"
          placeholder="Write your post here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />

        <button type="submit">Post</button>
        {error && <div className="alert">{error}</div>}
        {success && <div className="alert-success">{success}</div>}
      </form>
    </div>
  );
};

export default Compose;
