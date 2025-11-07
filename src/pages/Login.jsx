import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(220,10%,10%)] text-[hsl(var(--foreground))]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-96 p-8 rounded-2xl shadow-lg bg-[hsl(220,10%,13%)] border border-[hsl(217,32%,17%)]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-[hsl(220,10%,16%)] border border-[hsl(217,32%,17%)] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,50%)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-[hsl(220,10%,16%)] border border-[hsl(217,32%,17%)] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[hsl(195,100%,50%)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-2 bg-[hsl(195,100%,50%)] text-[hsl(var(--emphasis))] py-2 rounded-md font-semibold hover:bg-[hsl(195,100%,55%)] transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-[hsl(var(--foreground))]/70">
          Don’t have an account?{" "}
          <a href="/register" className="text-[hsl(195,100%,60%)] hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
