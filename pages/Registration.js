// src/pages/Registration.js
import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Registration({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const uniqueId = `HPTU${Math.floor(Math.random() * 100000)}`;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user in Firestore
      await addDoc(collection(db, "users"), {
        name,
        email,
        password: hashedPassword,
        uniqueId,
      });

      // Optional: Save user in Firebase Auth (email/password)
      await createUserWithEmailAndPassword(auth, email, password);

      // Save in localStorage with email
      const authUser = { uniqueId, email, loggedIn: true };
      localStorage.setItem("authUser", JSON.stringify(authUser));

      setMessage(`✅ Registered! Your ID is ${uniqueId}`);
      if (onSuccess) onSuccess(authUser);

      setTimeout(() => {
        navigate("/"); // redirect home
      }, 1500);
    } catch (error) {
      setMessage("❌ Error registering user: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-gray-800 text-white rounded-2xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-400 font-semibold">{message}</p>
        )}
      </motion.div>
    </div>
  );
}

export default Registration;
