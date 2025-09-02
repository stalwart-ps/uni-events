// src/pages/Login.js
import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ onSuccess }) {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, "users"), where("uniqueId", "==", uniqueId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
          // Firebase Auth login
          await signInWithEmailAndPassword(auth, user.email, password);

          const authUser = { uniqueId, email: user.email, loggedIn: true };
          localStorage.setItem("authUser", JSON.stringify(authUser));

          setMessage("✅ Login successful!");
          if (onSuccess) onSuccess(authUser);
        } else {
          setMessage("❌ Invalid password");
        }
      } else {
        setMessage("❌ Invalid ID");
      }
    } catch (error) {
      setMessage("❌ Error logging in: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your Unique ID"
          className="p-2 rounded text-black"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="p-2 bg-green-600 rounded hover:bg-green-700">
          Login
        </button>
      </form>
      <p className="mt-2">{message}</p>
    </div>
  );
}

export default Login;
