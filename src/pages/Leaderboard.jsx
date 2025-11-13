import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FiChevronUp, FiChevronDown, FiSearch } from "react-icons/fi";

export default function Leaderboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("weekly");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mock leaderboard data
    const generateUsers = () => {
      const randomNames = [
        "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Aryan",
        "Sai", "Ishaan", "Atharv", "Kabir", "Krishna", "Rudra",

        "Ananya", "Saanvi", "Diya", "Aadhya", "Aarohi", "Ira",
        "Myra", "Kiara", "Riya", "Sara", "Meera", "Nisha",

        "Raghav", "Dev", "Kunal", "Rohit", "Siddharth", "Harsh",
        "Naveen", "Abhinav", "Yash", "Pranav", "Manish", "Vishal",

        "Soumika", "Sneha", "Swara", "Tanvi", "Aparna", "Shreya",
        "Lakshmi", "Harini", "Kavya", "Shraddha", "Asmita", "Gayatri",

        "Farhan", "Ayaan", "Rehan", "Imran", "Zaid", "Yusuf",
        "Aaliyah", "Zoya", "Faiza", "Noor", "Sadia", "Hiba",
      ];

      return Array.from({ length: 20 }, (_, i) => {
        const gain = parseFloat((Math.random() * 25 - 5).toFixed(2)); // -5% to +20%

        return {
          id: i + 1,
          name: randomNames[i % randomNames.length],
          rank: i + 1,
          gain,
          value: Math.floor(Math.random() * 500000) + 50000,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${i}`,
          rising: Math.random() > 0.5,
        };
      }).sort((a, b) => b.gain - a.gain);
    };

    setUsers(generateUsers());

    // Live refresh every 4 sec
    const interval = setInterval(() => {
      setUsers((prev) =>
        prev
          .map((u) => ({
            ...u,
            gain: parseFloat((u.gain + (Math.random() * 2 - 1)).toFixed(2)),
            value: u.value + Math.floor(Math.random() * 2000 - 1000),
            rising: Math.random() > 0.5,
          }))
          .sort((a, b) => b.gain - a.gain)
          .map((u, i) => ({ ...u, rank: i + 1 }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const topThree = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="min-h-screen bg-[hsl(220,10%,10%)] text-white">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {isSidebarOpen && <Sidebar />}

      <div className="max-w-6xl mx-auto p-6 mt-4">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Leaderboard 🏆
        </motion.h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["weekly", "monthly", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-primary text-[hsl(195,100%,60%)] shadow-lg"
                  : "bg-[hsl(220,10%,20%)] text-gray-300 hover:bg-[hsl(220,10%,25%)]"
              }`}
            >
              {tab === "weekly"
                ? "Weekly"
                : tab === "monthly"
                ? "Monthly"
                : "All Time"}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search trader..."
            className="w-full bg-[hsl(220,10%,20%)] border border-[hsl(217,32%,17%)]
                       rounded-md py-2 pl-10 pr-4 text-white outline-none focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {topThree.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-5 rounded-xl shadow-lg bg-gradient-to-b 
                         from-[hsla(195,100%,20%,0.3)] to-[hsla(195,100%,10%,0.3)]
                         backdrop-blur-xl border border-[hsla(195,100%,40%,0.2)]"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </div>

              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 mx-auto rounded-full bg-white/10"
              />

              <h3 className="text-center mt-3 text-lg font-semibold">
                {user.name}
              </h3>

              <p className="text-center text-sm text-gray-300">
                ₹{user.value.toLocaleString()}
              </p>

              <p
                className={`text-center mt-2 font-bold ${
                  user.gain >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {user.gain >= 0 ? "+" : ""}
                {user.gain}%{" "}
                {user.rising ? (
                  <FiChevronUp className="inline text-emerald-300 ml-1" />
                ) : (
                  <FiChevronDown className="inline text-red-300 ml-1" />
                )}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Remaining List */}
        <div className="space-y-3">
          {rest.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between 
                         bg-[hsl(220,10%,15%)] border border-[hsla(195,100%,40%,0.2)]
                         p-4 rounded-lg hover:bg-[hsl(220,10%,20%)] transition"
            >
              <div className="flex items-center gap-4">
                <span className="w-6 text-gray-400 font-bold">{user.rank}</span>

                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />

                <span className="font-medium">{user.name}</span>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-300">
                  ₹{user.value.toLocaleString()}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    user.gain >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {user.gain >= 0 ? "+" : ""}
                  {user.gain}%{" "}
                  {user.rising ? (
                    <FiChevronUp className="inline text-emerald-300 ml-1" />
                  ) : (
                    <FiChevronDown className="inline text-red-300 ml-1" />
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 
                     bg-[hsl(220,10%,20%)] border border-[hsla(195,100%,40%,0.2)]
                     text-white px-6 py-4 rounded-lg shadow-xl"
        >
          <p className="text-sm">Your Rank</p>
          <p className="text-xl font-bold text-primary">
            #{Math.floor(Math.random() * 40) + 10}
          </p>
          <p className="text-xs text-gray-300 mt-1">
            You're close to the next tier — keep trading! 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
}
