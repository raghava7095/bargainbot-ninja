
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name?: string;
  email: string;
  isLoggedIn: boolean;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-brand-purple to-brand-teal flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">BargainBot<span className="text-brand-purple">Ninja</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-brand-purple transition-colors">
              Home
            </Link>
            <Link to="/trending" className="px-3 py-2 text-gray-700 hover:text-brand-purple transition-colors">
              Trending
            </Link>
            <Link to="/deals" className="px-3 py-2 text-gray-700 hover:text-brand-purple transition-colors">
              Top Deals
            </Link>
            <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-brand-purple transition-colors">
              About
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            {user?.isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Hi, {user.name || user.email.split('@')[0]}</span>
                <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/trending" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            <Link 
              to="/deals" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Top Deals
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user?.isLoggedIn ? (
                <div className="px-3 space-y-2">
                  <p className="text-sm font-medium">Hi, {user.name || user.email.split('@')[0]}</p>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center"
                    variant="outline"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center px-3 space-x-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button 
                    className="w-full" 
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
