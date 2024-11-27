import React, { useContext } from "react";
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/mini-images/logo.jpg';
import { AuthContext } from './../../Context/AuthProvider';
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
    
  const navigate = useNavigate();
  const handleLogOut=()=>{
      logOut()
      .then(()=>{
        toast.success('Logged Out Successfully')
        navigate('/')
      })
      .catch(error=>console.error(error.message));
  }
  const menuItems = (
    <>
      <li>
        <Link to="/" className="font-semibold">
          Home
        </Link>
      </li>
      <li>
        <Link to="/all-products" className="font-semibold">
          All Products
        </Link>
      </li>
      <li>
        <Link to="/blogs" className="font-semibold">
          Blogs
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/dashboard" className="font-semibold">
              Dashboard
            </Link>
          </li>
          {user.displayName && (
            <>
              <li className="ml-3 font-semibold lg:mt-7">
                {user?.displayName}
              </li>
            </>
          )}
          {user.photoURL && (
            <li>
              <img src={user.photoURL} className="w-24 h-20" alt=""></img>
            </li>
          )}
          <li>
            <button onClick={handleLogOut} className="font-semibold">
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login" className="font-semibold">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="font-semibold">
              <button className="btn-sm rounded-lg -ml-2 btn-secondary text-white">Sign Up</button>
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-sky-100 flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} className="lg:w-1/2  lg:ml-10 py-2" alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      {location.pathname.includes("dashboard") && (
        <label
          htmlFor="dashboard-drawer"
          tabIndex={2}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      )}
    </div>
  );
};

export default Header;
