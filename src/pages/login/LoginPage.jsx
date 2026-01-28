import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>SmartShop</h2>
                <p>Authentication has been removed. Click below to continue.</p>
                <button onClick={handleLogin} className="login-button">
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
