import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

const Login = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // sanitize function to block suspicious inputs
  const sanitizeInput = (str) => {
    return str.replace(/['";=<>]/g, "").trim();
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      // sanitize and enforce uppercase ID
      const id = sanitizeInput(uniqueId).toUpperCase();
      if (!/^HPTU\d{5}$/.test(id)) throw new Error("Invalid ID format (use HPTU00001).");

      const snap = await getDoc(doc(db, "users", id));
      if (!snap.exists()) throw new Error("ID not found.");

      const user = snap.data();

      // compare bcrypt hash
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) throw new Error("Incorrect password.");

      // save auth session
      localStorage.setItem("authUser", JSON.stringify({ uniqueId: id, loggedIn: true }));

      if (onSuccess) onSuccess(id);

      // ✅ Redirect to home page
      navigate("/", { replace: true });

    } catch (e2) {
      setErr(e2.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-4 flex justify-center">
      <form onSubmit={submit} className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Log in</h2>
        {err && <p className="mb-3 text-red-400">{err}</p>}

        <label className="block mb-2 text-gray-300">Unique ID (e.g., HPTU00001)</label>
        <input
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 outline-none"
          placeholder="HPTU00001"
          required
        />

        <label className="block mb-2 text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-gray-700 outline-none"
          placeholder="••••••••"
          required
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
