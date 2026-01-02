"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
        credentials: "include", // ✅ Ensure HttpOnly cookie is set in browser
      });

      if (res.ok) {
        // ✅ Hard redirect to dashboard after login
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-800">
      <form
        className="bg-white w-96 p-8 rounded-2xl shadow-2xl"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Admin Name"
          className="w-full p-3 border rounded-lg mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
