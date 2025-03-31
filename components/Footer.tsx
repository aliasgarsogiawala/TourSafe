import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white-1 text-white py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-2xl font-bold">
              TourSafe
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Features
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-400">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-400">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-sm">
          © {new Date().getFullYear()} TourSafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
