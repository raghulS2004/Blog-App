import React, { useState, useEffect } from "react";
import axios from "../api";
import './css/home.css';

function Home({ user }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        function fetchPosts() {
            axios.get('/posts')
                .then(response => {
                    setPosts(response.data)
                })
        }
        fetchPosts();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    function handleDelete(postId) {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        axios.delete(`/posts/${postId}`)
            .then(() => {
                setPosts(posts.filter(post => post._id !== postId));
            })
            .catch(err => {
                alert(err.response?.data?.error || "Failed to delete post");
            });
    }

    function startEdit(post) {
        setEditingPost(post._id);
        setEditTitle(post.title);
        setEditContent(post.content);
    }

    function cancelEdit() {
        setEditingPost(null);
        setEditTitle("");
        setEditContent("");
    }

    function handleEditSave(postId) {
        axios.patch(`/posts/${postId}`, {
            title: editTitle,
            content: editContent
        })
            .then(res => {
                setPosts(posts.map(post => post._id === postId ? res.data.post : post));
                cancelEdit();
            })
            .catch(err => {
                alert(err.response?.data?.error || "Failed to update post");
            });
    }

    // Helper to render content with formatting
    function renderFormattedContent(content) {
        // Split into lines
        const lines = content.split(/\r?\n/);
        const elements = [];
        let inList = false;
        let listItems = [];
        lines.forEach((line, idx) => {
            if (/^##\s?/.test(line)) {
                // Heading
                if (inList) {
                    elements.push(<ul key={`ul-${idx}`}>{listItems}</ul>);
                    inList = false;
                    listItems = [];
                }
                elements.push(<h3 key={`h3-${idx}`}>{line.replace(/^##\s?/, "")}</h3>);
            } else if (/^\s*([*-])\s+/.test(line)) {
                // Bullet point
                inList = true;
                listItems.push(<li key={`li-${idx}`}>{line.replace(/^\s*([*-])\s+/, "")}</li>);
            } else if (line.trim() === "") {
                // Empty line = paragraph break
                if (inList) {
                    elements.push(<ul key={`ul-${idx}`}>{listItems}</ul>);
                    inList = false;
                    listItems = [];
                }
                elements.push(<br key={`br-${idx}`}/>);
            } else {
                // Normal paragraph
                if (inList) {
                    elements.push(<ul key={`ul-${idx}`}>{listItems}</ul>);
                    inList = false;
                    listItems = [];
                }
                elements.push(<p key={`p-${idx}`}>{line}</p>);
            }
        });
        if (inList) {
            elements.push(<ul key={`ul-last`}>{listItems}</ul>);
        }
        return elements;
    }

    if (loading) return <div className="spinner-load">Loading...</div>;

    return (
        <div className="post-container">
            {user ? <h2>Welcome, {user.name}</h2> : ""}
            <h1>Blog Posts</h1>
            {posts.map((post, index) => {
                const isOwner = user && (post.author === user.name || post.author === user.username);
                return (
                    <div key={index} className="posts">
                        {editingPost === post._id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    className="edit-title-input"
                                />
                                <textarea
                                    value={editContent}
                                    onChange={e => setEditContent(e.target.value)}
                                    className="edit-content-input"
                                />
                                <button onClick={() => handleEditSave(post._id)} className="save-btn">Save</button>
                                <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                            </div>
                        ) : (
                            <>
                                <h2>{post.title}</h2>
                                {post.author && <h3>&nbsp;&nbsp;&nbsp;- {post.author}</h3>}
                                <div className="post-content">{renderFormattedContent(post.content)}</div>
                                {isOwner && (
                                    <div className="post-actions">
                                        <button onClick={() => startEdit(post)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
