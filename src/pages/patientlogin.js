import { useState } from "react";
import { useAuth } from "../../components/Auth";
import { motion } from "framer-motion";

export default function PatientLogin() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password }, "patient");
  };

  return (
    <motion.div className="flex items-center justify-center min-h-screen bg-[#e0f2fe]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1>Patient Login</h1>
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </motion.div>
  );
}
