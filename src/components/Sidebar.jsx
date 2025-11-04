import { NavLink } from "react-router-dom";
import { FiHome, FiPieChart, FiRepeat, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Portfolio", icon: <FiPieChart />, path: "/portfolio" },
    { name: "Transactions", icon: <FiRepeat />, path: "/transactions" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-white shadow-lg flex flex-col p-6 border-r border-gray-100">
      <h2 className="text-2xl font-semibold text-blue-600 mb-8">StockPilot</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
