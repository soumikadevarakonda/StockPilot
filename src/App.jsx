import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import "./styles/globals.css";
import Watchlist from "./pages/Watchlist";
import MarketNews from "./pages/MarketNews";
import Leaderboard from "./pages/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";

const protectedElement = (element) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Temporarily public routes for development */}
        <Route path="/dashboard" element={protectedElement(<Dashboard />)} />
        <Route path="/portfolio" element={protectedElement(<Portfolio />)} />
        <Route path="/transactions" element={protectedElement(<Transactions />)} />
        <Route path="/watchlist" element={protectedElement(<Watchlist />)} />
        <Route path="/settings" element={protectedElement(<Settings />)} />
        <Route path="/marketnews" element={protectedElement(<MarketNews />)} />
        <Route path="/leaderboard" element={protectedElement(<Leaderboard />)} />
      </Routes>
    </Router>
  );
}

export default App;
