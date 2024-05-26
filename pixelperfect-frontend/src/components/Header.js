import React from 'react';
import logo from '../logo.png';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800">
      <div className="max-w-xs">
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </div>
      <nav className="flex space-x-4">
        <a href="index.html" className="text-white hover:bg-gray-700 p-2 rounded">Home</a>
        <a href="help.html" className="text-white hover:bg-gray-700 p-2 rounded">Help</a>
      </nav>
    </header>
  );
};

export default Header;
