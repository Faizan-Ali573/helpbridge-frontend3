import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import UserDashboard from '../pages/dashboard/UserDashboard.jsx';
import VolunteerDashboard from '../pages/dashboard/VolunteerDashboard.jsx';
import AdminDashboard from '../pages/dashboard/AdminDashboard.jsx';
import RequestDetailPage from '../pages/Requests/RequestDetailPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute roles={['USER']}>
            <DashboardLayout>
              <UserDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/volunteer"
        element={
          <ProtectedRoute roles={['VOLUNTEER']}>
            <DashboardLayout>
              <VolunteerDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/requests/:id"
        element={
          <ProtectedRoute roles={['USER', 'VOLUNTEER', 'ADMIN']}>
            <DashboardLayout>
              <RequestDetailPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;


