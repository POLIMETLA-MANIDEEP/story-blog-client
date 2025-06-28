import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Upload, 
  Lightbulb, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X, 
  BookOpen,
  User,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
  location.pathname.startsWith(path);


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleNavigation = (path) => {
    setOpen(false);
    navigate(path);
  };

  const menuItems = [
    {
      path: '/home',
      icon: Home,
      label: 'Home',
      show: true
    },
    {
      path: '/suggest',
      icon: Lightbulb,
      label: 'Suggest Ideas',
      show: user?.role === 'user'
    },
    {
      path: '/upload',
      icon: Upload,
      label: 'Upload Story',
      show: user?.role === 'admin'
    },
    {
      path: '/admin/suggestions',
      icon: MessageSquare,
      label: 'View Suggestions',
      show: user?.role === 'admin'
    }
  ];

  const visibleMenuItems = menuItems.filter(item => item.show);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white/90 backdrop-blur-sm border-gray-300 shadow-lg hover:bg-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-2xl z-40 transform transition-all duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Story Blog</h1>
              <p className="text-sm text-blue-100">Community Stories</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-blue-200">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {user.role === 'admin' ? (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-sm">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                      <User className="h-3 w-3 mr-1" />
                      User
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-3">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-md hover:transform hover:scale-102'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-md"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;