import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            {/* Navbar */}
            <nav className="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                <span className="text-hb-primary text-2xl">🤝</span> HelpBridge
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                                <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                                <Link to="/register" className="bg-hb-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md shadow-blue-900/40">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-4">

                {/* Hero Section */}
                <section className="text-center w-full max-w-4xl pt-16 pb-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                        HelpBridge
                    </h1>
                    <p className="text-xl sm:text-2xl text-hb-secondary font-medium mb-4">
                        Connecting people in need with volunteers
                    </p>
                    <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        A fast, reliable platform to post a help request and get matched with the right local volunteers. Join the community to make a difference or receive the support you deserve.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/login" className="w-full sm:w-auto px-8 py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-100 font-semibold hover:bg-slate-700 transition-colors">
                            Login
                        </Link>
                        <Link to="/register" className="w-full sm:w-auto px-8 py-3 rounded-xl bg-hb-primary text-white font-semibold shadow-lg shadow-blue-900/50 hover:bg-blue-600 transition-colors">
                            Register
                        </Link>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="w-full max-w-5xl py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">How it Works</h2>
                        <div className="h-1 w-20 bg-hb-primary mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center shadow-xl hover:bg-slate-800/50 transition-colors">
                            <div className="w-12 h-12 bg-blue-900/50 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-blue-900">1</div>
                            <h3 className="text-lg font-semibold text-slate-100 mb-2">Create a help request</h3>
                            <p className="text-sm text-slate-400">Describe what you need help with. AI will automatically categorize your request.</p>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center shadow-xl hover:bg-slate-800/50 transition-colors">
                            <div className="w-12 h-12 bg-emerald-900/50 text-emerald-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-emerald-900">2</div>
                            <h3 className="text-lg font-semibold text-slate-100 mb-2">Volunteers get matched</h3>
                            <p className="text-sm text-slate-400">Local volunteers and admins are notified and can accept your request instantly.</p>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center shadow-xl hover:bg-slate-800/50 transition-colors">
                            <div className="w-12 h-12 bg-purple-900/50 text-purple-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border border-purple-900">3</div>
                            <h3 className="text-lg font-semibold text-slate-100 mb-2">Get help quickly</h3>
                            <p className="text-sm text-slate-400">Connect via built-in messaging, resolve the issue, and finally leave a review!</p>
                        </div>

                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-2">
                    <p className="text-slate-500 text-sm font-medium">Built for community support</p>
                    <p className="text-slate-600 text-xs">&copy; 2026 HelpBridge. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
