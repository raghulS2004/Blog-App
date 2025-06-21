import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from "./components/Home";
import About from './components/About'
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Compose from './components/Compose';
import axios from './api';
import './global.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            console.log('🔍 Checking authentication...');
            try {
                const response = await axios.get('/current_user');
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
        <BrowserRouter>
            <div>
                <Navbar user={user} url={API_URL} setUser={setUser} />
                <Routes>
                    <Route path='/' element={<Home url={API_URL} user={user} />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login' element={!user ? <Login url={API_URL} setUser={setUser} /> : <Navigate to="/compose" />} />
                    <Route path='/register' element={!user ? <Register url={API_URL} setUser={setUser} /> : <Navigate to="/compose" />} />
                    <Route path='/compose' element={user ? <Compose user={user} url={API_URL} /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;