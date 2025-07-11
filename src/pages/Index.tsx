
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../components/auth/LoginPage';
import Dashboard from '../components/dashboard/Dashboard';
import ParaHistory from '../components/para/ParaHistory';
import ParaDetails from '../components/para/ParaDetails';
import AuditDetails from '../components/audit/AuditDetails';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/para/:id" element={
            <ProtectedRoute>
              <ParaHistory />
            </ProtectedRoute>
          } />
          <Route path="/para/:id/details" element={
            <ProtectedRoute>
              <ParaDetails />
            </ProtectedRoute>
          } />
          <Route path="/audit/:type/:metric" element={
            <ProtectedRoute>
              <AuditDetails />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default Index;
