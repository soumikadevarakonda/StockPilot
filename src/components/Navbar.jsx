import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Bell } from "lucide-react";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[linear-gradient(to_right,hsl(220,12%,12%)_0%,hsl(220,12%,18%)_100%)] shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md border-b border-[hsl(220,10%,25%)]"
            : "bg-[hsla(220,12%,12%,0.5)] backdrop-blur-xl border-b border-[hsl(220,10%,20%)] shadow-[0_1px_8px_rgba(0,0,0,0.2)]"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left: Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => navigate("/dashboard")}
          >
            <Rocket className="h-6 w-6 text-primary drop-shadow-[0_0_6px_hsl(195,100%,50%)]" />
            <span className="text-[hsl(var(--emphasis))] text-lg font-semibold">
              StockPilot
            </span>
          </div>

          {/* Right: Notification + Logout */}
          <div className="flex items-center gap-6 text-[hsl(var(--emphasis))]">
            <button className="relative hover:text-primary transition">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] rounded-full px-1.5 py-[1px] text-white font-semibold">
                3
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to offset fixed navbar height */}
      <div className="h-16" />
    </>
  );
}
