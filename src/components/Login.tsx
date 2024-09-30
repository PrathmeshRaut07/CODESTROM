import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform login logic here
        if (email && password) {
            // Redirect to home after successful login
            navigate('/home');
        }
    };

    return (
        <div className="grid-container"> {/* Apply grid container */}
            <form onSubmit={handleLogin} className="login-form"> {/* Apply custom form styles */}
                <h2 className="text-2xl mb-6">Login</h2>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-indigo-600 text-white rounded p-2 w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
