import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, TrendingUp, Bitcoin, Landmark } from "lucide-react";

/* 🎨 Mock image pools per category */
const mockImages = {
  Stocks: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
    "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800",
    "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800",
    "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800",
    "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800",
    "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800",
    "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800",
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
    "https://images.unsplash.com/photo-1623227413711-25ee4388dae3?w=800",
  ],
  Crypto: [
    "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=800",
    "https://images.unsplash.com/photo-1634704760994-96e3ccf2ae85?w=800",
    "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800",
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
    "https://images.unsplash.com/photo-1623227413711-25ee4388dae3?w=800",
    "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800",
  ],
  Economy: [
    "https://images.unsplash.com/photo-1651340927948-26826aaef4b0?w=800",
    "https://images.unsplash.com/photo-1741520965035-263d8a2fc652?w=800",
    "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800",
    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800",
  ],
  All: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  ],
};


/* 🧠 Image picker */
const getNewsImage = (news, idx) => {
  const pool = mockImages[news.category] || mockImages.All;

  // Use title hash to distribute images better
  let hash = 0;
  for (let i = 0; i < news.title.length; i++) {
    hash = news.title.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % pool.length;
  return pool[index];
};


export default function MarketNews() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "All", icon: <Globe size={16} /> },
    { name: "Stocks", icon: <TrendingUp size={16} /> },
    { name: "Crypto", icon: <Bitcoin size={16} /> },
    { name: "Economy", icon: <Landmark size={16} /> },
  ];

  useEffect(() => {
    axios
      .get("/news")
      .then((res) => setNewsData(res.data))
      .catch((err) => console.error("Failed to load news", err))
      .finally(() => setLoading(false));
  }, []);

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
        <motion.h1
          className="text-4xl font-bold mb-6 text-[hsl(195,100%,75%)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Market News 📰
        </motion.h1>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveCategory(c.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    activeCategory === c.name
                      ? "bg-[hsl(195,100%,60%)] text-black"
                      : "bg-[hsl(220,10%,20%)] text-gray-300 hover:bg-[hsl(195,100%,30%)] hover:text-white"
                  }`}
              >
                {c.icon}
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading live market news...</p>
        ) : (
          <>
            {/* Featured */}
            {filteredNews.length > 0 && (
              <motion.div className="rounded-xl mb-10 overflow-hidden shadow-lg bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)]">
                <img
                  src={getNewsImage(filteredNews[0], 0)}
                  alt="featured"
                  className="w-full h-64 object-cover opacity-90"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {filteredNews[0].title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {filteredNews[0].source} • {filteredNews[0].time}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Grid */}
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-xl shadow-md overflow-hidden hover:scale-[1.03] transition-transform duration-300"
                >
                  <img
                    src={getNewsImage(news, idx)}
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
          </>
        )}
      </div>
    </div>
  );
}
