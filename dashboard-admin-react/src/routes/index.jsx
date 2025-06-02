import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import { privateRoutes, publicRoutes } from './routes';
import { useAuthStore } from '../store/useAuthStore';
import NotFound from '../pages/_NotFound';
export default function AppRouter() {
  const { checkAuth, isLoading, isAuthenticated } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Router>
        <Routes>
          {
            publicRoutes.map((route, index) => {
              let Layout;
              if (route.layout === null) {
                Layout = React.Fragment; // No layout
              } else if (route.layout === "auth") {
                Layout = AuthLayout;
              }
              const Element = route.element;
              return (
                <Route key={index} path={route.path} element={
                  <NotProtectedRoute>
                    <Layout>
                    <Element />
                  </Layout>
                  </NotProtectedRoute>
                } />
              )
            })
          }

          {
            privateRoutes.map((route, index) => {
              let Layout = null;
              if (route.layout === "admin") {
                Layout = AdminLayout
              } else {
                Layout = React.Fragment; // Default layout or no layout
              }
              const Element = route.element;
              return (
                <Route key={index} path={`/admin${route.path}`} element={
                  <ProtectedRoute>
                    <Layout>
                      <Element />
                    </Layout>
                  </ProtectedRoute>
                } />
              )
            })
          }

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return children; 
  }
  return <Navigate to="/login" />;
}

const NotProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return children; 
  }
  return <Navigate to="/admin/dashboard" />;
}