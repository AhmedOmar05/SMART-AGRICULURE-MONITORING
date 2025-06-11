import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
const Navbar = () => {
  return (
    <div className="navbar fixed top-0 z-50 w-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold text-purple-700">AgriSmart</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-purple-900 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
         
        </ul>
      </div>

      <div className="navbar-end">
        <Sidebar/>
      </div>
    </div>
  );
};

export default Navbar;
