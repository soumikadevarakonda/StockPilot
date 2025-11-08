import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Moon, Sun, Bell, BellOff, Settings as Cog } from "lucide-react";

export default function Settings() {
  const [user, setUser] = useState({ name: "Soumika", email: "soumika@stockpilot.com" });
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,10%)] text-[hsl(var(--foreground))]">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Cog className="text-primary" /> Settings
        </motion.h2>

        {/* ===== Profile Section ===== */}
        <motion.div
          className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-[hsl(0,0%,75%)]">Name:</span>{" "}
              <span className="font-medium">{user.name}</span>
            </p>
            <p>
              <span className="text-[hsl(0,0%,75%)]">Email:</span>{" "}
              <span className="font-medium">{user.email}</span>
            </p>
          </div>
          <button className="mt-6 px-4 py-2 bg-[hsl(195,100%,50%)] hover:bg-[hsl(195,100%,60%)] text-white font-medium rounded-md transition">
            Edit Profile
          </button>
        </motion.div>

        {/* ===== Preferences Section ===== */}
        <motion.div
          className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4">Preferences</h3>
          <div className="flex flex-col gap-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-3 py-1 rounded-md bg-[hsl(220,10%,18%)] hover:bg-[hsl(220,10%,25%)] transition"
              >
                {darkMode ? (
                  <>
                    <Moon size={16} /> <span>Enabled</span>
                  </>
                ) : (
                  <>
                    <Sun size={16} /> <span>Disabled</span>
                  </>
                )}
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className="flex items-center gap-2 px-3 py-1 rounded-md bg-[hsl(220,10%,18%)] hover:bg-[hsl(220,10%,25%)] transition"
              >
                {notifications ? (
                  <>
                    <Bell size={16} /> <span>On</span>
                  </>
                ) : (
                  <>
                    <BellOff size={16} /> <span>Off</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ===== Actions Section ===== */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="px-4 py-2 bg-[hsl(217,32%,17%)] hover:bg-[hsl(217,32%,25%)] text-white rounded-md transition">
            Reset Demo Data
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition">
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
}
