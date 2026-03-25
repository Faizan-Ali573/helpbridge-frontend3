import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
    const { login, isAuthenticated } = useAuth();
    const [loginStatus, setLoginStatus] = useState('Initializing demo environment...');

    useEffect(() => {
        const autoLoginDemo = async () => {
            if (!isAuthenticated) {
                try {
                    setLoginStatus('Loading dashboard automatically...');
                    await login({ email: 'demo@helpbridge.com', password: '12345678' });
                } catch (error) {
                    setLoginStatus('Auto-login failed. Please use manual login.');
                }
            } else {
                setLoginStatus('Already authenticated. Redirecting...');
            }
        };
        autoLoginDemo();
    }, [isAuthenticated, login]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center justify-center p-4">
            <div className="text-center w-full max-w-lg">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    HelpBridge Demo
                </h1>
                <p className="text-xl sm:text-2xl text-hb-secondary font-medium mb-8">
                    Connecting people in need with volunteers
                </p>
                
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-6 h-6 border-2 border-hb-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-lg text-slate-300 font-medium">{loginStatus}</p>
                    </div>
                    <p className="text-sm text-slate-500">
                        You are being automatically logged in as a Demo User to explore the platform.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/login" className="w-full sm:w-auto px-8 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-100 font-semibold hover:bg-slate-700 transition-colors">
                        Manual Login
                    </Link>
                    <Link to="/register" className="w-full sm:w-auto px-8 py-3 rounded-xl bg-hb-primary text-white font-semibold shadow-lg shadow-blue-900/50 hover:bg-blue-600 transition-colors">
                        Register Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
