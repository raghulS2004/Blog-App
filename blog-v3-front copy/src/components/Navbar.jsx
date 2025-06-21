import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './css/navbar.css';
import axios from "axios";

function Navbar({ url, user, setUser }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();
    function handleLogout() {
        axios.get('/logout')
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
                <Link to="/" className="nav-element">Home</Link>
                <Link to="/about" className="nav-element">About</Link>
                <Link to="/contact" className="nav-element">Contact</Link>
                <Link to="/compose" className="nav-element">Compose</Link>
                {user ? (
                    <div className="navbar-username">
                        <img src="/default-profile.jpg" alt="Profile" className="profile-pic" />
                        <span>{user.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="login">
                        <Link to="/login" className="nav-element">Login</Link>
                        <Link to="/register" className="nav-element">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
