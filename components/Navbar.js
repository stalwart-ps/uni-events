// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  // ✅ Update authUser whenever localStorage changes
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) setAuthUser(JSON.parse(storedUser));

    // Listen for localStorage changes (for cross-tab updates)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("authUser");
      setAuthUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null); // ✅ Immediately update state
    setProfileOpen(false);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Events", path: "/events" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Gallery", path: "/gallery" },
    { name: "Competition", path: "/competition" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6">
        <h1 className="text-2xl font-bold">UniEvents</h1>

        <ul className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="hover:text-purple-500 transition">
                {link.name}
              </Link>
            </li>
          ))}

          {authUser && (
            <li className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="hover:text-purple-500 transition"
              >
                Profile ▼
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 shadow-lg rounded-md p-4 flex flex-col gap-2 text-left">
                  <p><b>Unique ID:</b> {authUser.uniqueId}</p>
                  <p><b>Email:</b> {authUser.email}</p>
                  <Link to="/forget-password" className="text-blue-400 hover:underline">
                    Forget Password
                 </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-2 p-2 bg-red-600 rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-3xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <ul
        className={`flex flex-col gap-4 bg-gray-900 p-4 md:hidden absolute w-full top-full left-0 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              onClick={() => setOpen(false)}
              className="block w-full hover:text-purple-400 transition"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
