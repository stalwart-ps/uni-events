// src/pages/Home.js
import React, { useState, useEffect } from "react";
import Registration from "./Registration";
import Login from "./Login";

function Home() {
  const [authUser, setAuthUser] = useState(null);
  const [activeForm, setActiveForm] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) setAuthUser(JSON.parse(storedUser));

    // ✅ Listen for login/logout events
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("authUser");
      setAuthUser(updatedUser ? JSON.parse(updatedUser) : null);
      setActiveForm(null); // Hide forms if login/logout happens
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSuccess = (userData) => {
    localStorage.setItem("authUser", JSON.stringify({ ...userData, loggedIn: true }));
    setAuthUser({ ...userData, loggedIn: true });
    setActiveForm(null); // Hide form after login/register
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {!authUser && !activeForm && (
        <div className="flex flex-col gap-4 items-center mt-20">
          <h1 className="text-4xl font-bold mb-6">Welcome to UniEvents</h1>
          <div className="flex gap-4">
            <button
              className="p-3 bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => setActiveForm("register")}
            >
              Register
            </button>
            <button
              className="p-3 bg-green-600 rounded-md hover:bg-green-700"
              onClick={() => setActiveForm("login")}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {activeForm === "register" && <Registration onSuccess={handleSuccess} />}
      {activeForm === "login" && <Login onSuccess={handleSuccess} />}

      <div className="mt-20 text-center max-w-3xl px-4">
        <h2 className="text-3xl font-bold mb-4">Welcome to UniEvents Portal</h2>
        <p className="text-gray-300">
          Discover upcoming events, competitions, sponsors, and gallery.
        </p>
      </div>
    </div>
  );
}

export default Home;
