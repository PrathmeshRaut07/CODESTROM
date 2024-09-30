import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import VoiceCallMentor from './components/VoiceCallMentor';
import Video from './components/Video';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/voicecallmentor" element={<VoiceCallMentor />} /> {/* Properly close this Route */}
                <Route path="/video" element={<Video />} />
            </Routes>
        </Router>
    );
}

export default App;
