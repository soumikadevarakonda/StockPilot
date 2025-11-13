import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiPieChart,
  FiRepeat,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiGlobe,
  FiBarChart2,
} from "react-icons/fi";
import { Rocket } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Portfolio", icon: <FiPieChart />, path: "/portfolio" },
    { name: "Watchlist", icon: <FiStar />, path: "/watchlist" },
    { name: "Market News", icon: <FiGlobe />, path: "/marketnews" },
    { name: "Transactions", icon: <FiStar />, path: "/transactions" },
    { name: "Leaderboard", icon: <FiBarChart2 />, path: "/leaderboard" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? 220 : 80 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="
        h-screen flex flex-col justify-between
        text-[hsl(var(--foreground))]
        border-r border-[hsla(195,100%,30%,0.2)]
        bg-[hsla(220,10%,15%,0.55)]
        backdrop-blur-lg
        bg-gradient-to-b from-[hsla(220,10%,15%,0.65)] to-[hsla(220,10%,10%,0.6)]
        transition-all duration-300
      "
    >
      {/* --- Top Section --- */}
      <div className="p-4 flex flex-col gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Rocket className="h-6 w-6 text-[hsl(195,100%,60%)]" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-semibold tracking-wide text-white"
              >
                StockPilot
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[hsla(195,100%,55%,0.15)] text-[hsl(195,100%,60%)]"
                    : "text-[hsl(195,40%,85%)] hover:text-[hsl(195,100%,60%)] hover:bg-[hsla(195,100%,45%,0.1)]"
                }`
              }
            >
              <div className="text-lg">{item.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* --- Collapse Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-3 border-t border-[hsl(217,32%,17%)] hover:bg-[hsla(195,100%,40%,0.15)] transition text-[hsl(195,100%,60%)]"
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
    </motion.aside>
  );
}
