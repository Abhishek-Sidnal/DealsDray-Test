import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/dealsdray_logo.jpeg";
import toast from "react-hot-toast";  // Import react-hot-toast

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("You have successfully logged out!");  // Add toast message for logout
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-semibold">
            <img
              src={logo}
              alt="DealsDray Logo"
              className="h-10 rounded-full"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/employees/create" className="hover:underline">
            Create Employee
          </Link>
          <Link to="/employees" className="hover:underline">
            Employee List
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <span>{username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleMenu}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-blue-500 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4">
              <Link
                to="/"
                className="text-lg font-semibold"
                onClick={toggleMenu}
              >
                <img
                  src={logo}
                  alt="DealsDray Logo"
                  className="h-10 rounded-full"
                />
              </Link>
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className="hover:underline" onClick={toggleMenu}>
                Home
              </Link>
              <Link
                to="/employees/create"
                className="hover:underline"
                onClick={toggleMenu}
              >
                Create Employee
              </Link>
              <Link
                to="/employees"
                className="hover:underline"
                onClick={toggleMenu}
              >
                Employee List
              </Link>
              {token ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
