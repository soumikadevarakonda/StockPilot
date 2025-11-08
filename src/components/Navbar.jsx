import { useNavigate } from "react-router-dom";
import { Rocket, Bell, Search } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-[hsl(220,10%,10%)]/95 backdrop-blur-sm border-b border-[hsl(217,32%,17%)] px-6 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex items-center justify-between"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Logo (same as landing header) */}
      <div className="flex items-center gap-2 select-none cursor-pointer">
        <Rocket className="h-6 w-6 text-primary" />
        <span className="text-[hsl(var(--emphasis))] text-lg font-semibold tracking-wide">
          StockPilot
        </span>
      </div>

      {/* Center: Search bar (optional) */}
      <div className="hidden sm:flex items-center bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-md px-3 py-1.5 w-72">
        <Search size={16} className="text-[hsl(0,0%,70%)] mr-2" />
        <input
          type="text"
          placeholder="Search stocks, tickers..."
          className="bg-transparent outline-none text-[hsl(var(--foreground))] w-full placeholder-[hsl(0,0%,60%)]"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative hover:text-primary transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] rounded-full px-1.5 py-[1px] text-white font-semibold">
            3
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-primary transition"
        >
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </motion.nav>
  );
}
