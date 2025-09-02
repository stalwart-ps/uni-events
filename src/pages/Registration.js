import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, getNextUniqueId } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

const Registration = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      // ✅ Basic sanitization
      const name = form.name.trim();
      const email = form.email.trim().toLowerCase();
      const password = form.password;

      if (name.length < 2) throw new Error("Name must be at least 2 characters.");
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Enter a valid email.");
      if (password.length < 6) throw new Error("Password must be at least 6 characters.");

      // ✅ Hash password before saving
      const passwordHash = await bcrypt.hash(password, 10);

      // ✅ Generate unique ID
      const uniqueId = await getNextUniqueId("HPTU", 5);

      // ✅ Double-check user ID doesn't already exist
      const userRef = doc(db, "users", uniqueId);
      const exists = await getDoc(userRef);
      if (exists.exists()) throw new Error("Unexpected ID collision. Please try again.");

      // ✅ Save new user in Firestore
      await setDoc(userRef, {
        uniqueId,
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
      });

      // ✅ Store session in localStorage
      localStorage.setItem(
        "authUser",
        JSON.stringify({ uniqueId, loggedIn: true })
      );

      // ✅ Notify parent AuthManager (optional)
      if (onSuccess) onSuccess(uniqueId);

      // ✅ Navigate to Dashboard (or Home)
      navigate("/");

    } catch (e2) {
      console.error(e2);
      setErr(e2.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create your account</h2>
        {err && <p className="mb-3 text-red-400">{err}</p>}

        {/* Name */}
        <label className="block mb-2 text-gray-300">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 outline-none"
          placeholder="Your full name"
          required
        />

        {/* Email */}
        <label className="block mb-2 text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 outline-none"
          placeholder="email"
          required
        />

        {/* Password */}
        <label className="block mb-2 text-gray-300">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded bg-gray-700 outline-none"
          placeholder="Min 6 characters"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
