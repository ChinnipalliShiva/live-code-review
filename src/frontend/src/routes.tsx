// src/routes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthForm from "./main/authForm/AuthForm";
import Dashboard from "./main/pages/dashboard";

interface AppRoutesProps {
  isLoggedIn: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isLoggedIn }) => {
  // Redirect unauthenticated users to login
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  // Redirect authenticated users to dashboard
  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }
    return <>{children}</>;
  };

  return (
    <Routes>
      {/* Root path redirect */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* Auth routes - protected from logged in users */}
      <Route
        path="/login"
        element={
          <AuthRoute>
            <AuthForm />
          </AuthRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthRoute>
            <AuthForm />
          </AuthRoute>
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all route for 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
