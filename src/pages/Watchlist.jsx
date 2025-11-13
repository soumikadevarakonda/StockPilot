import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Watchlist() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [stocks, setStocks] = useState([]);

  // --- 50+ MOCK WATCHLIST ENTRIES ---
  const mockData = [
    // Stocks - NSE, NYSE, NASDAQ
    { symbol: "AAPL", name: "Apple Inc", price: 182.12, type: "Stock" },
    { symbol: "TSLA", name: "Tesla", price: 252.34, type: "Stock" },
    { symbol: "GOOGL", name: "Alphabet", price: 144.55, type: "Stock" },
    { symbol: "MSFT", name: "Microsoft", price: 329.88, type: "Stock" },
    { symbol: "AMZN", name: "Amazon", price: 158.45, type: "Stock" },
    { symbol: "META", name: "Meta", price: 294.13, type: "Stock" },
    { symbol: "NFLX", name: "Netflix", price: 450.12, type: "Stock" },
    { symbol: "NVDA", name: "NVIDIA", price: 799.22, type: "Stock" },

    // Indian Stocks
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2720, type: "Stock" },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1604, type: "Stock" },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3740, type: "Stock" },
    { symbol: "INFY", name: "Infosys", price: 1450, type: "Stock" },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 985, type: "Stock" },
    { symbol: "SBIN", name: "State Bank of India", price: 732, type: "Stock" },
    { symbol: "ITC", name: "ITC Ltd", price: 445, type: "Stock" },

    // Crypto
    { symbol: "BTC", name: "Bitcoin", price: 31000, type: "Crypto" },
    { symbol: "ETH", name: "Ethereum", price: 2100, type: "Crypto" },
    { symbol: "SOL", name: "Solana", price: 98, type: "Crypto" },
    { symbol: "XRP", name: "Ripple", price: 0.56, type: "Crypto" },
    { symbol: "ADA", name: "Cardano", price: 0.42, type: "Crypto" },

    // Indices
    { symbol: "NIFTY50", name: "Nifty 50", price: 21987, type: "Index" },
    { symbol: "SENSEX", name: "Sensex", price: 72789, type: "Index" },
    { symbol: "SPX", name: "S&P 500", price: 4534, type: "Index" },
    { symbol: "DJI", name: "Dow Jones", price: 37654, type: "Index" },
    { symbol: "NASDAQ", name: "NASDAQ", price: 15600, type: "Index" },
  ];

  // Initialize data
  useEffect(() => {
    setStocks(mockData);
  }, []);

  // Live price random updates every 1.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const change = (Math.random() * 2 - 1) * (s.price * 0.003); // small fluctuation
          return {
            ...s,
            price: parseFloat((s.price + change).toFixed(2)),
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Searching
  const filteredSearch = stocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Category filtering
  const filteredCategory = filteredSearch.filter((s) =>
    category === "All" ? true : s.type === category
  );

  return (
    <div className="relative min-h-screen bg-[hsl(220,10%,10%)] text-white">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed z-50 top-0 left-0 h-full"
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="p-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <motion.h1
            className="text-2xl font-bold tracking-wide"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Watchlist
          </motion.h1>

          {/* Search */}
          <input
            type="text"
            placeholder="Search stocks..."
            className="
              w-full md:w-[300px] px-4 py-2 rounded-lg 
              bg-[hsl(220,10%,18%)] border border-[hsl(217,32%,20%)]
              text-white placeholder-gray-400 
              focus:outline-none focus:border-primary transition
            "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-6">
          {["All", "Stock", "Crypto", "Index"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`
                px-4 py-1.5 rounded-md text-sm font-medium transition
                ${
                  category === c
                    ? "bg-primary text-[hsl(195,100%,60%)]"
                    : "bg-[hsl(220,10%,18%)] text-gray-300 hover:text-white"
                }
              `}
            >
              {c}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl p-6 shadow-xl">
          <table className="w-full text-sm">
            <thead className="text-gray-300 border-b border-[hsl(217,32%,17%)]">
              <tr>
                <th className="text-left py-2">Symbol</th>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Change</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategory.map((s) => {
                const randomChange = ((Math.random() * 2 - 1) * 1.2).toFixed(2);
                const isUp = randomChange >= 0;

                return (
                  <tr
                    key={s.symbol}
                    className="border-b border-[hsl(217,32%,17%)] hover:bg-[hsl(220,10%,18%)] transition"
                  >
                    <td className="py-3 font-medium">{s.symbol}</td>
                    <td className="text-gray-400">{s.name}</td>
                    <td>₹ {s.price.toLocaleString()}</td>
                    <td
                      className={isUp ? "text-emerald-400" : "text-red-400"}
                    >
                      {isUp ? "+" : "-"} {Math.abs(randomChange)}%
                      {isUp ? (
                        <ArrowUpRight size={14} className="inline ml-1" />
                      ) : (
                        <ArrowDownRight size={14} className="inline ml-1" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
