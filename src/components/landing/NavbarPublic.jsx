import { Link } from "react-router-dom";

export default function NavbarPublic() {
  return (
    <header className="bg-white/60 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-blue-600">📈 StockPilot</div>
          <div className="text-sm text-gray-500 hidden sm:block">Smart paper trading. Real practice.</div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Login</Link>
          <Link
            to="/register"
            className="hidden sm:inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
