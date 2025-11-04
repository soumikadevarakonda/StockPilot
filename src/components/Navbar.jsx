import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white shadow-lg">
      <h1 className="text-xl font-bold tracking-wide">📊 StockPilot</h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-700 transition"
      >
        <FiLogOut size={18} /> Logout
      </button>
    </nav>
  );
}
