import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import UserDashboard from '../pages/dashboard/UserDashboard.jsx';
import VolunteerDashboard from '../pages/dashboard/VolunteerDashboard.jsx';
import AdminDashboard from '../pages/dashboard/AdminDashboard.jsx';
import RequestDetailPage from '../pages/Requests/RequestDetailPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';

import RequestsPage from '../pages/Requests/RequestsPage.jsx';
import MessagesPage from '../pages/Messages/MessagesPage.jsx';
import ProfilePage from '../pages/Profile/ProfilePage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const DashboardRedirect = () => {
  const { user } = useAuth();
  const role = user?.role || 'USER';

  const dashboardPath =
    role === 'ADMIN'
      ? '/dashboard/admin'
      : role === 'VOLUNTEER'
        ? '/dashboard/volunteer'
        : '/dashboard/user';

  return <Navigate to={dashboardPath} replace />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard Redirect */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        }
      />

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
        path="/requests"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <RequestsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <MessagesPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfilePage />
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


