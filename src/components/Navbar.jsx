
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { Home, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <Home className="h-8 w-8" />
            <span>StayFinder</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/listings" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              All Listings
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/my-reviews" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  My Reviews
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Welcome, {user?.username}</span>
                  </div>
                  <Button 
                    onClick={handleLogout} 
                    variant="outline" 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/my-reviews" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                  My Reviews
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              ) : (
                <Link to="/login">
                  <Button size="sm">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/listings" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              All Listings
            </Link>
            <Link 
              to="/my-reviews" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              My Reviews
            </Link>
            {isAuthenticated && (
              <div className="text-gray-700 py-2">
                Welcome, {user?.username}
              </div>
            )}
            {!isAuthenticated && (
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-700 font-medium py-2 transition-colors"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
