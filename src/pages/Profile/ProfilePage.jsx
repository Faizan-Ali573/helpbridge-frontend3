import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-md shadow-slate-950/60">
            <h1 className="text-2xl font-bold text-white mb-6">Your Profile</h1>
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                    <div className="h-16 w-16 rounded-full bg-hb-primary flex items-center justify-center text-xl font-bold text-white uppercase">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
                        <p className="text-sm text-slate-400">{user?.email}</p>
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Role</p>
                        <p className="text-sm text-slate-200">{user?.role}</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Status</p>
                        <p className="text-sm text-green-400">Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
