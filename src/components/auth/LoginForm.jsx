import { useState } from "react";

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    onSubmit({ username, password });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-purple-200"
      >
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-2">
          Smart Clinic
        </h1>
        <h2 className="text-gray-700 text-center mb-6">Login to your account</h2>

        <div className="mb-4">
          <label htmlFor="Username" className="block font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="Username"
            name="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Password" className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {error && (
          <p className="text-red-600 mb-4 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
