import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`✅ Password reset email sent to ${email}. Check your inbox.`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-24">
      <div className="p-8 bg-gray-800 text-white rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            className="p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Reset Email
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-400 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
