import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from "./components/Home";
import About from './components/About'
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Compose from './components/Compose';
import axios from 'axios';

// Configure axios defaults
const baseURL = process.env.REACT_APP_API_URL || 'https://blog-app-drgj.onrender.com';
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('🔍 Checking authentication...');
                const response = await axios.get(`${baseURL}/current_user`, { withCredentials: true });
                console.log('🔍 Auth response:', response.data);
                if (response.data.user) {
                    console.log('✅ User authenticated:', response.data.user.username);
                    setUser(response.data.user);
                } else {
                    console.log('❌ No user in response');
                    setUser(null);
                }
            } catch (error) {
                console.error('❌ Auth check failed:', error.response?.data || error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div className="spinner-load">Loading...</div>;
    }

    return (
        <Router>
            <div>
                <Navbar user={user} url={baseURL} setUser={setUser} />
                <Routes>
                    <Route path='/' element={<Home url={baseURL} user={user} />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={user ? <Navigate to="/compose" /> : <Login setUser={setUser} />} />
                    <Route path='/register' element={user ? <Navigate to="/compose" /> : <Register setUser={setUser} />} />
                    <Route path='/compose' element={user ? <Compose user={user} url={baseURL} /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;