import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const email = "soumika@stockpilot.com";
    const token = localStorage.getItem("token");

    // Fetch profile
    if (token) {
      axios
        .get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data))
        .catch(() => setUser({ name: "Soumika", email }));
    } else {
      setUser({ name: "Soumika", email });
    }

    // Mock portfolio summary
    setPortfolio({
      balance: 132450,
      profitLoss: 6350,
      holdingsCount: 10,
      activeTrades: 3,
    });

    // Mock holdings
    setHoldings([
      { symbol: "AAPL", qty: 10, avgPrice: 175, currentPrice: 182, sector: "Tech" },
      { symbol: "TSLA", qty: 5, avgPrice: 720, currentPrice: 700, sector: "Auto" },
      { symbol: "RELIANCE", qty: 12, avgPrice: 2600, currentPrice: 2720, sector: "Energy" },
      { symbol: "INFY", qty: 8, avgPrice: 1450, currentPrice: 1400, sector: "Tech" },
      { symbol: "TCS", qty: 6, avgPrice: 3600, currentPrice: 3740, sector: "Tech" },
      { symbol: "HDFC", qty: 5, avgPrice: 1550, currentPrice: 1605, sector: "Finance" },
      { symbol: "HINDUNILVR", qty: 4, avgPrice: 2500, currentPrice: 2470, sector: "FMCG" },
      { symbol: "AMZN", qty: 3, avgPrice: 3120, currentPrice: 3250, sector: "E-Commerce" },
      { symbol: "SUNPHARMA", qty: 10, avgPrice: 1170, currentPrice: 1215, sector: "Pharma" },
      { symbol: "ICICIBANK", qty: 15, avgPrice: 960, currentPrice: 985, sector: "Banking" },
    ]);

    // Mock transactions
    setTransactions([
      { id: 1, symbol: "AAPL", type: "BUY", qty: 5, price: 175 },
      { id: 2, symbol: "TSLA", type: "SELL", qty: 2, price: 710 },
      { id: 3, symbol: "INFY", type: "BUY", qty: 4, price: 1420 },
      { id: 4, symbol: "RELIANCE", type: "BUY", qty: 3, price: 2600 },
      { id: 5, symbol: "TCS", type: "BUY", qty: 2, price: 3620 },
    ]);

    // Yearly chart data
    setChartData([
      { month: "Jan", net: 108000 },
      { month: "Feb", net: 110500 },
      { month: "Mar", net: 114200 },
      { month: "Apr", net: 112000 },
      { month: "May", net: 118000 },
      { month: "Jun", net: 121300 },
      { month: "Jul", net: 125000 },
      { month: "Aug", net: 122500 },
      { month: "Sep", net: 127000 },
      { month: "Oct", net: 132000 },
      { month: "Nov", net: 129000 },
      { month: "Dec", net: 136000 },
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
          Welcome back, {user ? user.name : "Soumika"} 👋
        </motion.h2>

        {/* ===== Portfolio Summary ===== */}
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

        {/* ===== Main Layout ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Holdings Section */}
          <motion.div
            className="lg:col-span-2 bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4">Your Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-[hsl(0,0%,80%)] border-b border-[hsl(217,32%,17%)]">
                  <tr>
                    <th className="text-left py-2">Symbol</th>
                    <th className="text-left py-2">Sector</th>
                    <th className="text-left py-2">Qty</th>
                    <th className="text-left py-2">Avg</th>
                    <th className="text-left py-2">Current</th>
                    <th className="text-left py-2">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => {
                    const pnl = ((h.currentPrice - h.avgPrice) * h.qty).toFixed(2);
                    const isProfit = pnl >= 0;
                    const changePct = (((h.currentPrice - h.avgPrice) / h.avgPrice) * 100).toFixed(1);
                    return (
                      <tr
                        key={h.symbol}
                        className="border-b border-[hsl(217,32%,17%)] hover:bg-[hsl(220,10%,18%)] transition"
                      >
                        <td className="py-3 font-medium">{h.symbol}</td>
                        <td className="text-[hsl(0,0%,70%)]">{h.sector}</td>
                        <td>{h.qty}</td>
                        <td>₹ {h.avgPrice}</td>
                        <td className="flex items-center gap-1">
                          ₹{h.currentPrice}
                          {isProfit ? (
                            <ArrowUpRight size={14} className="text-emerald-400" />
                          ) : (
                            <ArrowDownRight size={14} className="text-red-400" />
                          )}
                        </td>
                        <td className={isProfit ? "text-emerald-400" : "text-red-400"}>
                          {isProfit ? "+" : ""}₹{pnl} ({changePct}%)
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* ===== Chart + Transactions ===== */}
          <div className="flex flex-col gap-6">
            {/* Chart */}
            <motion.div
              className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold mb-3">Yearly Portfolio Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(195,100%,65%)" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="hsl(195,100%,55%)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="rgba(255,255,255,0.6)"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#0b1220",
                        border: "none",
                        color: "#fff",
                        borderRadius: "6px",
                      }}
                      formatter={(val) => [`₹${val.toLocaleString()}`, "Net Worth"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="net"
                      stroke="hsl(195,100%,65%)"
                      fill="url(#colorNet)"
                      strokeWidth={2.5}
                      activeDot={{ r: 4, fill: "hsl(195,100%,65%)", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Transactions */}
            <motion.div
              className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                      <span className="text-[hsl(0,0%,75%)]">
                        {t.qty} @ ₹{t.price}
                      </span>
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

/* ==== StatCard Component ==== */
function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="rounded-xl bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
    >
      <h3 className="text-sm text-[hsl(0,0%,75%)] mb-2">{title}</h3>
      <p className={`text-2xl font-semibold ${color || ""}`}>{value}</p>
    </motion.div>
  );
}
