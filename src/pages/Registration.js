import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Generate unique ID
      const uniqueId = "HPTU" + Math.floor(Math.random() * 100000);

      await addDoc(collection(db, "users"), {
        name,
        email,
        password, // ⚠️ In real apps, hash this
        uniqueId,
      });

      setMessage(`✅ Registered! Your ID is ${uniqueId}`);
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div className="pt-24 min-h-screen flex items-start justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default Registration;
