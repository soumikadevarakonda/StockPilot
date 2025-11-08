import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Mock data consistent with Dashboard
    setTransactions([
      { id: 1, symbol: "AAPL", type: "BUY", qty: 5, price: 175, date: "2025-11-01" },
      { id: 2, symbol: "TSLA", type: "SELL", qty: 2, price: 710, date: "2025-10-28" },
      { id: 3, symbol: "INFY", type: "BUY", qty: 4, price: 1420, date: "2025-10-25" },
      { id: 4, symbol: "RELIANCE", type: "BUY", qty: 3, price: 2600, date: "2025-10-20" },
      { id: 5, symbol: "TCS", type: "BUY", qty: 2, price: 3620, date: "2025-10-15" },
      { id: 6, symbol: "HDFC", type: "SELL", qty: 1, price: 1620, date: "2025-10-10" },
      { id: 7, symbol: "ICICIBANK", type: "BUY", qty: 5, price: 975, date: "2025-10-05" },
    ]);
  }, []);

  const totalTrades = transactions.length;
  const totalVolume = transactions.reduce((acc, t) => acc + t.qty, 0);
  const totalBuy = transactions.filter((t) => t.type === "BUY").length;
  const totalSell = transactions.filter((t) => t.type === "SELL").length;
  const lastTrade = transactions[0]?.symbol || "—";

  return (
    <div className="min-h-screen bg-[hsl(220,10%,10%)] text-[hsl(var(--foreground))]">
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Transaction History 📜
        </motion.h2>

        {/* ===== Summary Cards ===== */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StatCard title="Total Trades" value={totalTrades} />
          <StatCard title="Total Volume" value={totalVolume} />
          <StatCard title="Buys vs Sells" value={`${totalBuy} / ${totalSell}`} />
          <StatCard title="Last Trade" value={lastTrade} />
        </motion.div>

        {/* ===== Transactions Table ===== */}
        <motion.div
          className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4">All Transactions</h3>
          <div className="overflow-y-auto max-h-[28rem] rounded-md scrollbar-thin scrollbar-thumb-[hsl(217,32%,25%)] scrollbar-track-[hsl(220,10%,13%)]">
            <table className="w-full text-sm">
              <thead className="text-[hsl(0,0%,80%)] border-b border-[hsl(217,32%,17%)]">
                <tr>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Symbol</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Qty</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
                  const total = (t.price * t.qty).toLocaleString();
                  const isBuy = t.type === "BUY";
                  return (
                    <tr
                      key={t.id}
                      className={`border-b border-[hsl(217,32%,17%)] hover:bg-[hsl(220,10%,18%)] transition`}
                    >
                      <td className="py-3 text-[hsl(0,0%,75%)]">{t.date}</td>
                      <td className="font-medium">{t.symbol}</td>
                      <td
                        className={`font-semibold flex items-center gap-1 ${
                          isBuy ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isBuy ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        {t.type}
                      </td>
                      <td>{t.qty}</td>
                      <td>₹ {t.price}</td>
                      <td>₹ {total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
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
