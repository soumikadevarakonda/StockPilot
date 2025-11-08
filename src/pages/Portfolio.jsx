import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Portfolio() {
  const [holdings, setHoldings] = useState([]);
  const [summary, setSummary] = useState({ invested: 0, value: 0, profitLoss: 0 });
  const [loading, setLoading] = useState(true);
  const email = "soumika@stockpilot.com"; // replace later with user context

  useEffect(() => {
    axios
      .get(`/api/portfolio/${email}`)
      .then((res) => {
        const data = res.data;
        setHoldings(data);
        computeSummary(data);
      })
      .catch(() => {
        // fallback mock data — consistent with Dashboard
        const mock = [
          { symbol: "AAPL", quantity: 10, avgPrice: 175, currentPrice: 182, sector: "Tech" },
          { symbol: "TSLA", quantity: 5, avgPrice: 720, currentPrice: 700, sector: "Auto" },
          { symbol: "RELIANCE", quantity: 12, avgPrice: 2600, currentPrice: 2720, sector: "Energy" },
          { symbol: "INFY", quantity: 8, avgPrice: 1450, currentPrice: 1400, sector: "Tech" },
          { symbol: "TCS", quantity: 6, avgPrice: 3600, currentPrice: 3740, sector: "Tech" },
          { symbol: "HDFC", quantity: 5, avgPrice: 1550, currentPrice: 1605, sector: "Finance" },
          { symbol: "HINDUNILVR", quantity: 4, avgPrice: 2500, currentPrice: 2470, sector: "FMCG" },
          { symbol: "AMZN", quantity: 3, avgPrice: 3120, currentPrice: 3250, sector: "E-Commerce" },
          { symbol: "SUNPHARMA", quantity: 10, avgPrice: 1170, currentPrice: 1215, sector: "Pharma" },
          { symbol: "ICICIBANK", quantity: 15, avgPrice: 960, currentPrice: 985, sector: "Banking" },
        ];
        setHoldings(mock);
        computeSummary(mock);
      })
      .finally(() => setLoading(false));
  }, []);

  const computeSummary = (data) => {
    let invested = 0,
      value = 0;
    data.forEach((h) => {
      invested += h.avgPrice * h.quantity;
      value += h.currentPrice * h.quantity;
    });
    setSummary({
      invested,
      value,
      profitLoss: value - invested,
    });
  };

  const COLORS = ["#00C9A7", "#0088FE", "#FFBB28", "#FF5B5B", "#A28EFF"];
  const sectorData = Object.values(
    holdings.reduce((acc, h) => {
      acc[h.sector] = acc[h.sector] || { name: h.sector, value: 0 };
      acc[h.sector].value += h.currentPrice * h.quantity;
      return acc;
    }, {})
  );

  return (
    <div className="min-h-screen bg-[hsl(220,10%,10%)] text-[hsl(var(--foreground))] p-8">
      <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>

      {loading ? (
        <p className="text-gray-400">Loading portfolio...</p>
      ) : (
        <>
          {/* ===== Summary Cards ===== */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SummaryCard
              title="Total Invested"
              value={`₹ ${summary.invested.toLocaleString()}`}
            />
            <SummaryCard
              title="Current Value"
              value={`₹ ${summary.value.toLocaleString()}`}
            />
            <SummaryCard
              title="Net Profit / Loss"
              value={`₹ ${summary.profitLoss.toLocaleString()}`}
              color={summary.profitLoss >= 0 ? "text-emerald-400" : "text-red-400"}
            />
          </motion.div>

          {/* ===== Chart + Holdings Layout ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sector Allocation Chart */}
            <motion.div
              className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {sectorData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#0b1220",
                        border: "none",
                        color: "#fff",
                      }}
                      formatter={(val) => [`₹${val.toLocaleString()}`, "Value"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Holdings Table */}
            <motion.div
              className="lg:col-span-2 bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold mb-4">Holdings Overview</h3>
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
                      const pnl = ((h.currentPrice - h.avgPrice) * h.quantity).toFixed(2);
                      const isProfit = pnl >= 0;
                      const changePct = (
                        ((h.currentPrice - h.avgPrice) / h.avgPrice) *
                        100
                      ).toFixed(1);
                      return (
                        <tr
                          key={h.symbol}
                          className="border-b border-[hsl(217,32%,17%)] hover:bg-[hsl(220,10%,18%)] transition"
                        >
                          <td className="py-3 font-medium">{h.symbol}</td>
                          <td className="text-[hsl(0,0%,70%)]">{h.sector}</td>
                          <td>{h.quantity}</td>
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
          </div>
        </>
      )}
    </div>
  );
}

/* Summary Card */
function SummaryCard({ title, value, color }) {
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
