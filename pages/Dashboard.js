import React from "react";

function Dashboard({ user, onLogout }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">🎉 Welcome!</h1>
      <p className="mt-2 text-lg">You are logged in as: <b>{user.uniqueId}</b></p>
      <button
        onClick={onLogout}
        className="mt-4 p-3 bg-red-600 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
