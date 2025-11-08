import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { Bell, Search } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[hsl(220,10%,10%)] border-b border-[hsl(217,32%,17%)] px-6 py-3 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-2 cursor-pointer select-none">
        <span className="text-primary text-2xl">📊</span>
        <h1 className="text-lg font-semibold tracking-wide text-[hsl(var(--emphasis))]">
          StockPilot
        </h1>
      </div>

      {/* Middle: Search (optional, for tickers) */}
      <div className="hidden sm:flex items-center bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-md px-3 py-1.5 text-sm w-72">
        <Search size={16} className="text-[hsl(0,0%,70%)] mr-2" />
        <input
          type="text"
          placeholder="Search stocks, tickers..."
          className="bg-transparent outline-none text-[hsl(var(--foreground))] w-full placeholder-[hsl(0,0%,60%)]"
        />
      </div>

      {/* Right: Icons */}
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
    </nav>
  );
}
