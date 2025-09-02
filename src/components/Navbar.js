import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
  { name: "Home", path: "/" },
  { name: "Registration", path: "/registration" },
  { name: "About Us", path: "/about" },
  { name: "FAQ", path: "/faq" },
  { name: "Events", path: "/events" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Gallery", path: "/gallery" },
  { name: "Competition", path: "/competition" }, // NEW LINK
  { name: "Contact Us", path: "/contact" },
];

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6">
        <h1 className="text-2xl font-bold">UniEvents</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="hover:text-purple-500 transition">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-3xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
