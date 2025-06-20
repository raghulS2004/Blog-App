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

function App() {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const baseURL = process.env.REACT_APP_API_URL;


    useEffect(() => {
        axios.get(baseURL + '/current_user', { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
                console.log(user);
                
                setLoading(false); 
            })
            .catch(() => setLoading(false)); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 

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
                    <Route path='/login' element={user ? <Navigate to="/" /> : <Login url={baseURL} user={user} setUser={setUser} />} />
                    <Route path='/register' element={user ? <Navigate to="/" /> : <Register url={baseURL} user={user} setUser={setUser} />} />
                    <Route path='/compose' element={user ? <Compose user={user} url={baseURL} /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;