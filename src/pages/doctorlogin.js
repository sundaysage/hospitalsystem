import { useState } from "react";
import { useAuth } from "../../components/Auth";
export default function DoctorLogin() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password }, "doctor"); // Calls login from Auth.js
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e0f2fe]">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#075985] text-center">Doctor Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#075985] text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
