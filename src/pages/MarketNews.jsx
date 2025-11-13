import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, TrendingUp, Bitcoin, Landmark } from "lucide-react";

export default function MarketNews() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    { name: "All", icon: <Globe size={16} /> },
    { name: "Stocks", icon: <TrendingUp size={16} /> },
    { name: "Crypto", icon: <Bitcoin size={16} /> },
    { name: "Economy", icon: <Landmark size={16} /> },
  ];

  const newsData = [
    {
      title: "Sensex surges 480 points as IT and banking stocks rally",
      source: "Economic Times",
      time: "2h ago",
      category: "Stocks",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800",
    },
    {
      title: "Bitcoin crosses $98,000 for the first time, crypto market explodes",
      source: "CoinDesk",
      time: "10m ago",
      category: "Crypto",
      image:
        "https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "US inflation dips to 2.8%, markets react positively",
      source: "Bloomberg",
      time: "1h ago",
      category: "Economy",
      image:
        "https://images.unsplash.com/photo-1741520965035-263d8a2fc652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5mbGF0aW9ufGVufDB8fDB8fHww",
    },
    {
      title: "Reliance Industries hits all-time high after strong Q4 results",
      source: "Moneycontrol",
      time: "3h ago",
      category: "Stocks",
      image:
        "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2lsJTIwaW5kdXN0cnl8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Gold prices slip as dollar strengthens globally",
      source: "Reuters",
      time: "50m ago",
      category: "Economy",
      image:
        "https://images.unsplash.com/photo-1651340927948-26826aaef4b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZCUyMHByaWNlfGVufDB8fDB8fHww",
    },
    {
      title: "Ethereum upgrades slash gas fees by 40%",
      source: "CoinTelegraph",
      time: "20m ago",
      category: "Crypto",
      image:
        "https://images.unsplash.com/photo-1634704760994-96e3ccf2ae85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV0aGVyZXVtfGVufDB8fDB8fHww",
    },
  ];

  const filteredNews = newsData.filter(
    (n) =>
      (activeCategory === "All" || n.category === activeCategory) &&
      n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[hsl(220,10%,10%)] text-[hsl(var(--foreground))]">
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
              className="fixed top-0 left-0 h-full z-50"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold mb-6 text-[hsl(195,100%,75%)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Market News 📰
        </motion.h1>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex items-center w-full md:w-80 bg-[hsl(220,10%,20%)] border border-[hsl(217,32%,17%)] rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white w-full outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveCategory(c.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    activeCategory === c.name
                      ? "bg-[hsl(195,100%,60%)] text-[hsl(195,100%,60%)]"
                      : "bg-[hsl(220,10%,20%)] text-gray-300 hover:bg-[hsl(195,100%,30%)] hover:text-white"
                  }`}
              >
                {c.icon}
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredNews.length > 0 && (
          <motion.div
            className="rounded-xl mb-10 overflow-hidden shadow-lg bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={filteredNews[0].image}
              alt="featured"
              className="w-full h-64 object-cover opacity-90"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{filteredNews[0].title}</h2>
              <p className="text-gray-400 text-sm">
                {filteredNews[0].source} • {filteredNews[0].time}
              </p>
            </div>
          </motion.div>
        )}

        {/* News Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredNews.map((news, idx) => (
            <motion.div
              key={idx}
              className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl shadow-md overflow-hidden hover:scale-[1.03] transition-transform duration-300"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{news.title}</h3>
                <p className="text-gray-400 text-sm">
                  {news.source} • {news.time}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
