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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Temporarily public routes for development */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/marketnews" element={<MarketNews />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
