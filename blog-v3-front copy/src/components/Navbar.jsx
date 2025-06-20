import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './css/navbar.css';
import axios from "axios";

function Navbar({ url, user, setUser }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();
    function handleLogout() {
        axios.get(url + '/logout', { withCredentials: true })
            .then(response => {
                alert("Logged out successfully");
                setUser(null);
                setIsNavOpen(false);
                navigate('/');
            })
            .catch(error => {
                console.error("Error during logout", error);
            });
    }

    function toggleNavbar() {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <nav className="navbar sticky-navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <span className="navbar-logo-text">Raghul's Blog Post</span>
            </div>
            <div className="toggle-button" onClick={toggleNavbar}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`navbar-links ${isNavOpen ? 'active' : ''}`}>
                <a href="/" className="nav-element">Home</a>
                <a href="/about" className="nav-element">About</a>
                <a href="/contact" className="nav-element">Contact</a>
                <a href="/compose" className="nav-element">Compose</a>
                {user ? (
                    <div className="navbar-username">
                        <img src="/default-profile.jpg" alt="Profile" className="profile-pic" />
                        <span>{user.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="login">
                        <a href="/login" className="nav-element">Login</a>
                        <a href="/register" className="nav-element">Register</a>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
