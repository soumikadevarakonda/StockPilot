import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Watchlist() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mockWatchlist = [
    // 🇮🇳 **NSE India**
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2720, change: 1.2 },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3740, change: -0.5 },
    { symbol: "INFY", name: "Infosys", price: 1450, change: 0.8 },
    { symbol: "HDFC", name: "HDFC Bank", price: 1610, change: 0.3 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 985, change: 1.1 },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2480, change: -0.9 },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1830, change: 0.6 },
    { symbol: "SBIN", name: "State Bank of India", price: 635, change: 1.4 },
    { symbol: "SUNPHARMA", name: "Sun Pharma", price: 1215, change: 0.9 },
    { symbol: "MARUTI", name: "Maruti Suzuki", price: 11250, change: -1.2 },
    { symbol: "ADANIENT", name: "Adani Enterprises", price: 2380, change: 2.3 },
    { symbol: "TITAN", name: "Titan Company", price: 3350, change: -0.4 },
    { symbol: "ONGC", name: "ONGC", price: 205, change: 1.0 },
    { symbol: "WIPRO", name: "Wipro", price: 420, change: -1.5 },
    { symbol: "BHARTIARTL", name: "Airtel", price: 940, change: 0.7 },

    // 🇺🇸 **NASDAQ / NYSE**
    { symbol: "AAPL", name: "Apple", price: 182, change: 0.4 },
    { symbol: "MSFT", name: "Microsoft", price: 415, change: 1.2 },
    { symbol: "GOOGL", name: "Alphabet Class A", price: 154, change: -0.3 },
    { symbol: "AMZN", name: "Amazon", price: 3250, change: 0.6 },
    { symbol: "TSLA", name: "Tesla", price: 700, change: -2.2 },
    { symbol: "META", name: "Meta Platforms", price: 272, change: 1.7 },
    { symbol: "NVDA", name: "NVIDIA", price: 950, change: 2.1 },
    { symbol: "NFLX", name: "Netflix", price: 440, change: -0.8 },
    { symbol: "AMD", name: "AMD", price: 150, change: -1.5 },
    { symbol: "DIS", name: "Disney", price: 100, change: 1.1 },
    { symbol: "BABA", name: "Alibaba", price: 88, change: -0.7 },
    { symbol: "UBER", name: "Uber", price: 56, change: 0.9 },
    { symbol: "NIO", name: "NIO", price: 9, change: -3.4 },
    { symbol: "IBM", name: "IBM", price: 142, change: 0.4 },
    { symbol: "INTC", name: "Intel", price: 42, change: -1.0 },
    { symbol: "PYPL", name: "PayPal", price: 62, change: -2.1 },
    { symbol: "COIN", name: "Coinbase", price: 178, change: 3.8 },
    { symbol: "SHOP", name: "Shopify", price: 74, change: 1.9 },
    { symbol: "ORCL", name: "Oracle", price: 112, change: 0.2 },
    { symbol: "CRM", name: "Salesforce", price: 265, change: 1.6 },

    // 🪙 **Crypto**
    { symbol: "BTC", name: "Bitcoin", price: 56420, change: 2.5 },
    { symbol: "ETH", name: "Ethereum", price: 3150, change: 1.9 },
    { symbol: "SOL", name: "Solana", price: 92, change: 4.8 },
    { symbol: "XRP", name: "Ripple", price: 0.62, change: -1.3 },
    { symbol: "DOGE", name: "Dogecoin", price: 0.085, change: 3.1 },
    { symbol: "ADA", name: "Cardano", price: 0.52, change: -0.6 },
    { symbol: "MATIC", name: "Polygon", price: 0.98, change: 2.0 },
    { symbol: "DOT", name: "Polkadot", price: 6.1, change: -2.1 },
    { symbol: "AVAX", name: "Avalanche", price: 34, change: 1.3 },

    // 🌍 **Global Indices**
    { symbol: "NIFTY50", name: "Nifty 50", price: 22450, change: 0.8 },
    { symbol: "SENSEX", name: "Sensex", price: 74480, change: 0.7 },
    { symbol: "DJI", name: "Dow Jones", price: 38240, change: -0.2 },
    { symbol: "SPX", name: "S&P 500", price: 5080, change: 1.1 },
    { symbol: "IXIC", name: "NASDAQ 100", price: 17890, change: 1.9 },

    // 📦 **ETFs**
    { symbol: "QQQ", name: "Invesco QQQ", price: 438, change: 1.2 },
    { symbol: "SPY", name: "SPDR S&P 500 ETF", price: 508, change: 0.9 },
    { symbol: "VTI", name: "Vanguard Total Market ETF", price: 263, change: 0.4 },
    { symbol: "ARKK", name: "ARK Innovation ETF", price: 45, change: -0.9 },
    { symbol: "GLD", name: "Gold ETF", price: 184, change: 0.2 },

    // 🌾 **Commodities**
    { symbol: "GOLD", name: "Gold", price: 2050, change: 1.3 },
    { symbol: "SILVER", name: "Silver", price: 24.5, change: 0.7 },
    { symbol: "CRUDE", name: "Crude Oil", price: 82.4, change: -1.8 },
    { symbol: "NG", name: "Natural Gas", price: 2.7, change: 1.0 },
  ];

  return (
    <div className="min-h-screen bg-[hsl(220,10%,10%)] text-white">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3 }}
              className="fixed z-50 top-0 left-0 h-full"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Watchlist ⭐</h1>

        <div className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 shadow-lg">
          <div className="overflow-y-auto max-h-[70vh]">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-700 text-gray-300">
                <tr>
                  <th className="py-2 text-left">Symbol</th>
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Price</th>
                  <th className="py-2 text-left">Change</th>
                </tr>
              </thead>
              <tbody>
                {mockWatchlist.map((s) => {
                  const isUp = s.change >= 0;
                  return (
                    <tr
                      key={s.symbol}
                      className="border-b border-[hsl(217,32%,17%)] hover:bg-[hsl(220,10%,18%)] transition"
                    >
                      <td className="py-3 font-medium">{s.symbol}</td>
                      <td className="text-gray-300">{s.name}</td>
                      <td>₹{s.price.toLocaleString()}</td>
                      <td
                        className={`flex items-center gap-1 ${
                          isUp ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {s.change}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
