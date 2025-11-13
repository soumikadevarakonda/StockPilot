import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../api/axios";
import { X, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TradeModal({ isOpen, onClose, email, onTradeComplete }) {
  const [activeTab, setActiveTab] = useState("buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setActiveTab("buy");
      setSymbol("");
      setQuantity("");
      setPrice("");
      setMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTrade = async () => {
    if (!symbol || !quantity || (activeTab === "buy" && !price)) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const endpoint = activeTab === "buy" ? "/portfolio/buy" : "/portfolio/sell";
      const payload = {
        email,
        symbol: symbol.toUpperCase(),
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };

      const res = await axios.post(endpoint, payload);

      setMessage(`✅ ${activeTab === "buy" ? "Bought" : "Sold"} successfully!`);
      setLoading(false);
      if (onTradeComplete) onTradeComplete(res.data);

      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1500);

      setSymbol("");
      setQuantity("");
      setPrice("");
    } catch (err) {
      setLoading(false);
      setMessage("❌ " + (err.response?.data || "Transaction failed."));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-[hsl(220,10%,15%)] border border-[hsl(217,32%,17%)] rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.4)] w-[90%] max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={22} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-6 text-center text-white tracking-wide">
              Trade Stocks
            </h2>

            {/* Tabs */}
            <div className="flex mb-8 border-b border-[hsl(217,32%,17%)]">
              {["buy", "sell"].map((tab) => (
                <motion.button
                  key={tab}
                  whileTap={{ scale: 0.96 }}
                  className={`flex-1 py-3 text-lg font-semibold rounded-t-md transition-all duration-200
                    ${
                      activeTab === tab
                        ? tab === "buy"
                          ? "text-cyan-400 border-b-2 border-cyan-400 shadow-[0_2px_15px_rgba(0,255,255,0.15)]"
                          : "text-red-400 border-b-2 border-red-500 shadow-[0_2px_15px_rgba(255,0,0,0.15)]"
                        : "text-white/70 hover:text-white"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "buy" ? "Buy" : "Sell"}
                </motion.button>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-5">
              <InputField
                label="Stock Symbol"
                placeholder="e.g., AAPL"
                value={symbol}
                onChange={setSymbol}
              />
              <InputField
                label="Quantity"
                placeholder="e.g., 10"
                value={quantity}
                onChange={setQuantity}
                type="number"
              />
              {activeTab === "buy" && (
                <InputField
                  label="Price (₹)"
                  placeholder="e.g., 175"
                  value={price}
                  onChange={setPrice}
                  type="number"
                />
              )}
            </div>

            {/* Message */}
            <AnimatePresence>
              {message && (
                <motion.p
                  key={message}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-5 text-sm text-center ${
                    message.startsWith("✅")
                      ? "text-emerald-400"
                      : message.startsWith("❌")
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleTrade}
              disabled={loading}
              className={`mt-8 w-full flex items-center justify-center gap-2 rounded-md px-4 py-3 font-medium text-lg transition-all
                ${
                  activeTab === "buy"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                    : "bg-gradient-to-r from-red-500 to-red-700 text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]"
                } ${loading ? "opacity-75 cursor-wait" : ""}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : activeTab === "buy" ? (
                <>
                  Buy <ArrowUpRight size={18} />
                </>
              ) : (
                <>
                  Sell <ArrowDownRight size={18} />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Subcomponent for clean inputs */
function InputField({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-[hsl(220,10%,20%)] border border-[hsl(217,32%,17%)] p-2.5 text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition"
      />
    </div>
  );
}
