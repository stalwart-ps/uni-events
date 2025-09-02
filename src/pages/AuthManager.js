import React, { useEffect, useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";

function AuthManager() {
  const [step, setStep] = useState("loading"); 

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.loggedIn) {
        setStep("dashboard");
      } else {
        setStep("login");
      }
    } else {
      setStep("choice");
    }
  }, []);

  const handleRegisterSuccess = (uniqueId) => {
    localStorage.setItem("authUser", JSON.stringify({ uniqueId, loggedIn: true }));
    setStep("dashboard");
  };

  const handleLoginSuccess = (uniqueId) => {
    localStorage.setItem("authUser", JSON.stringify({ uniqueId, loggedIn: true }));
    setStep("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setStep("choice");
  };

  if (step === "loading") return <p className="text-white">Loading...</p>;
  if (step === "dashboard") return <Dashboard onLogout={handleLogout} />;
  if (step === "choice") {
    return (
      <div className="flex flex-col gap-4 text-center text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>
        <button
          onClick={() => setStep("register")}
          className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <button
          onClick={() => setStep("login")}
          className="p-2 bg-green-600 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    );
  }
  if (step === "register")
    return <Registration onSuccess={handleRegisterSuccess} />;
  if (step === "login") return <Login onSuccess={handleLoginSuccess} />;

  return null;
}

export default AuthManager;
