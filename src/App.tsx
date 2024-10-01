// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import VoiceCallMentor from './components/VoiceCallMentor';
import Video from './components/Video';
import DSA from './components/DSA'; // Import DSA component
import CodeEditor from './components/CodeEditor'; // Import CodeEditor component
import GroupDiscussion from './components/GroupDiscussion';
import Aptitude from './components/Aptitude';
import Resume from './components/Resume';
import Roadmap from './components/roadmap';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/voicecallmentor" element={<VoiceCallMentor />} />
                <Route path="/video" element={<Video />} />
                <Route path="/dsa" element={<DSA />} /> {/* Add DSA route */}
                <Route path="/code-editor" element={<CodeEditor />} /> {/* Add CodeEditor route */}
                <Route path="/gd" element={<GroupDiscussion />} />
                <Route path="/aptitude" element={<Aptitude/>} />
                <Route path="/resume" element={<Resume/>} />
                <Route path="/roadmap" element={<Roadmap/>} />
            </Routes>
        </Router>
    )
}

export default App;