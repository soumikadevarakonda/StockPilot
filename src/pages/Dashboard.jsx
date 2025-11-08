import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = "demo@stockpilot.com"; // temp during dev

    if (token) {
      axios
        .get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data))
        .catch(() => setUser({ name: "Soumika", email }));
    } else {
      setUser({ name: "Guest User", email });
    }

    axios
      .get(`/api/portfolio/${email}`)
      .then((res) => setPortfolio(res.data))
      .catch(() =>
        setPortfolio({
          balance: 125000,
          profitLoss: 4200,
          holdingsCount: 6,
          activeTrades: 2,
        })
      );

    axios
      .get(`/api/portfolio/${email}`)
      .then((res) => setHoldings(res.data))
      .catch(() =>
        setHoldings([
          { symbol: "AAPL", qty: 10, avgPrice: 175, currentPrice: 182 },
          { symbol: "TSLA", qty: 5, avgPrice: 720, currentPrice: 700 },
          { symbol: "RELIANCE", qty: 12, avgPrice: 2600, currentPrice: 2720 },
          { symbol: "INFY", qty: 8, avgPrice: 1450, currentPrice: 1400 },
        ])
      );

    axios
      .get(`/api/transactions/${email}`)
      .then((res) => setTransactions(res.data))
      .catch(() =>
        setTransactions([
          { id: 1, symbol: "AAPL", type: "BUY", qty: 5, price: 175 },
          { id: 2, symbol: "TSLA", type: "SELL", qty: 2, price: 710 },
          { id: 3, symbol: "INFY", type: "BUY", qty: 4, price: 1420 },
        ])
      );

    // mock net worth data for chart
    setChartData([
      { day: "Mon", net: 120000 },
      { day: "Tue", net: 121200 },
      { day: "Wed", net: 122500 },
      { day: "Thu", net: 122000 },
      { day: "Fri", net: 123800 },
      { day: "Sat", net: 125000 },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,10%)] text-[hsl(var(--foreground))]">
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome back, {user ? user.name : "Trader"} 👋
        </motion.h2>

        {/* ===== Portfolio Summary (Full Width) ===== */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StatCard title="Net Balance" value={`₹ ${portfolio?.balance?.toLocaleString()}`} />
          <StatCard
            title="Total Profit/Loss"
            value={`₹ ${portfolio?.profitLoss?.toLocaleString()}`}
            color={portfolio?.profitLoss >= 0 ? "text-emerald-400" : "text-red-400"}
          />
          <StatCard title="Holdings" value={portfolio?.holdingsCount || 0} />
          <StatCard title="Active Trades" value={portfolio?.activeTrades || 0} />
        </motion.div>

        {/* ===== 2-Column Layout (Holdings + Chart + Transactions) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Holdings (2 columns wide) */}
          <motion.div
            className="lg:col-span-2 bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">Your Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[hsl(0,0%,80%)] border-b border-[hsl(217,32%,17%)]">
                  <tr>
                    <th className="text-left py-2">Symbol</th>
                    <th className="text-left py-2">Qty</th>
                    <th className="text-left py-2">Avg Price</th>
                    <th className="text-left py-2">Current</th>
                    <th className="text-left py-2">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => {
                    const pnl = ((h.currentPrice - h.avgPrice) * h.qty).toFixed(2);
                    const isProfit = pnl >= 0;
                    return (
                      <tr
                        key={h.symbol}
                        className="border-b border-[hsl(217,32%,17%)] hover:bg-[hsl(220,10%,20%)] transition"
                      >
                        <td className="py-3 font-medium">{h.symbol}</td>
                        <td>{h.qty}</td>
                        <td>₹ {h.avgPrice}</td>
                        <td>₹ {h.currentPrice}</td>
                        <td className={isProfit ? "text-emerald-400" : "text-red-400"}>
                          {isProfit ? "+" : ""}₹{pnl}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right Side: Chart + Transactions */}
          <div className="flex flex-col gap-6">
            {/* Performance Chart */}
            <motion.div
              className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-3">Portfolio Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip contentStyle={{ background: "#0b1220", border: "none", color: "#fff" }} />
                    <Line type="monotone" dataKey="net" stroke="hsl(195,100%,50%)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
              <ul className="space-y-3">
                {transactions.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between text-sm border-b border-[hsl(217,32%,17%)] pb-2"
                  >
                    <div>
                      <span className="font-medium">{t.symbol}</span>{" "}
                      <span className="text-[hsl(0,0%,75%)]">{t.qty} @ ₹{t.price}</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        t.type === "BUY" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {t.type}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable StatCard */
function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="rounded-xl bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] p-6 shadow-lg"
    >
      <h3 className="text-sm text-[hsl(0,0%,75%)] mb-2">{title}</h3>
      <p className={`text-2xl font-semibold ${color || ""}`}>{value}</p>
    </motion.div>
  );
}
