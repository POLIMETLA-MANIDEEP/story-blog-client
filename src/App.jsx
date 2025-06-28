import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Routes>
      </div>
    </div>
  );
};

export default App;