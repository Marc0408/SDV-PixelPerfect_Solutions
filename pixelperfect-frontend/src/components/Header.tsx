import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-800">
      <div className="w-24"> {/* Ändern Sie die Breite entsprechend Ihren Anforderungen */}
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </div>
      <nav className="flex space-x-4">
        <Link to="/">
          <p className="text-white hover:bg-gray-700 p-2 rounded">Home</p>
        </Link>
        <Link to="/help">
          <p className="text-white hover:bg-gray-700 p-2 rounded">Help</p>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
