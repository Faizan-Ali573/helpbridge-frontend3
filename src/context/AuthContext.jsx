import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService.js';
import { setAuthToken, clearAuthToken } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('hb_token');
    if (!token) {
      setLoading(false);
      return;
    }
    setAuthToken(token);
    authService
      .getMe()
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        handleLogout(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const redirectByRole = (role) => {
    if (role === 'ADMIN') navigate('/admin-dashboard');
    else if (role === 'VOLUNTEER') navigate('/volunteer-dashboard');
    else navigate('/user-dashboard');
  };

  const handleLogin = async (credentials) => {
    const data = await authService.login(credentials);
    const { token, ...loggedInUser } = data;
    localStorage.setItem('hb_token', token);
    setAuthToken(token);
    setUser(loggedInUser);
    redirectByRole(loggedInUser.role);
  };

  const handleRegister = async (data) => {
    const responseData = await authService.register(data);
    const { token, ...newUser } = responseData;
    localStorage.setItem('hb_token', token);
    setAuthToken(token);
    setUser(newUser);
    redirectByRole(newUser.role);
  };

  const handleLogout = (doNavigate = true) => {
    localStorage.removeItem('hb_token');
    clearAuthToken();
    setUser(null);
    if (doNavigate) navigate('/login');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


