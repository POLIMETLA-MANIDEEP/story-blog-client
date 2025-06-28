import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UploadStory from './pages/UploadStory';
import Sidebar from './components/Sidebar';
import SuggestionBox from './pages/SuggestionBox';
import AdminSuggestions from './pages/AdminSuggestions';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const hideSidebar = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideSidebar && <Sidebar />}
      <div className={`${!hideSidebar ? 'md:ml-64' : ''} transition-all duration-300`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute requiredRole="admin">
                <UploadStory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suggest"
            element={
              <ProtectedRoute>
                <SuggestionBox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/suggestions"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminSuggestions />
              </ProtectedRoute>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;