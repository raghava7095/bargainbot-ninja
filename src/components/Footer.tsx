
import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">BargainBot<span className="text-brand-purple">Ninja</span></span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              AI-powered shopping assistant that helps you find the best deals across multiple platforms.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/trending" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Trending Products</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Best Deals</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/category/fashion" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Fashion</Link>
              </li>
              <li>
                <Link to="/category/home" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Home & Kitchen</Link>
              </li>
              <li>
                <Link to="/category/beauty" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Beauty & Personal Care</Link>
              </li>
              <li>
                <Link to="/category/books" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Books & Media</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-purple text-sm transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BargainBotNinja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
