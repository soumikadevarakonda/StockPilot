import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Welcome to StockPilot Dashboard</h2>

        {user ? (
          <div className="bg-white shadow-md rounded-lg p-6 w-fit">
            <p className="text-lg font-medium">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-gray-500">Fetching your details...</p>
        )}
      </div>
    </div>
  );
}
