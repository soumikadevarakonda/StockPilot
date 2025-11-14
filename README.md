# 📈 StockPilot – Virtual Stock Trading Simulator

StockPilot is a beautifully designed, interactive **virtual stock trading platform** that allows users to buy and sell mock stocks, maintain a dynamic portfolio, view live watchlists, explore market news, and climb a competitive leaderboard — all with a smooth, modern UI.

Built for enthusiasts, students, and developers learning market mechanics, StockPilot replicates the visual and functional experience of a real trading dashboard.

---

## 🧩 Features

### 🔹 Portfolio Management
- View detailed holdings with sector classification
- Real-time P/L calculations and graphical charts
- Interactive **Trade Modal** for Buy/Sell

### 🔹 Watchlist
- 60+ mock stocks (NSE, NYSE, Crypto)
- Live price fluctuations using timed intervals
- Filter tabs and instant search
- Polished UI for professional feel

### 🔹 Market News
- Fully static page with curated financial headlines
- Clean card layout with images and categories

### 🔹 Leaderboard
- Dynamic ranking system
- Auto-updating values and gains
- Top-3 spotlight design
- Searchable full leaderboard list

### 🔹 Transactions History
- Track all mock trades

---

## 🚀 Tech Stack

### **Frontend:**
- React (Vite)
- TailwindCSS
- Framer Motion
- Recharts
- Lucide Icons / React Icons
- Axios

### **Backend:**
- Spring Boot (Java)
- Hibernate / JPA
- MySQL / H2 (dev)

### **Other:**
- Dicebear (avatars)
- Mock Data Generators

---

## 🏁 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/soumikadevarakonda/StockPilot.git
cd StockPilot
```

### 2️⃣ Install Frontend Dependencies
```bash
cd stockpilot-frontend
npm install
npm run dev
```

### 3️⃣ Run Backend (Spring Boot)
Import backend folder into Eclipse or VS Code (Java) and run:
```bash
git clone https://github.com/soumikadevarakonda/StockPilot-BE
```
Backend runs on `http://localhost:8080`
Frontend runs on `http://localhost:5173`

---

## 🧪 Demo Mode
If backend is offline, StockPilot automatically loads:
- Mock portfolio
- Mock watchlist assets
- Randomized leaderboard
- Local news articles

This allows **fully functional UI exploration** without server setup.

---

## 🧭 Project Structure
```
stockpilot/
 ├── backend/         # Spring Boot API
 └── frontend/        # React + Vite
       ├── components/
       ├── pages/
       ├── api/
       ├── assets/
       └── styles/
```

---

## 📈 Future Enhancements
- Real stock market API integration
- User authentication + JWT
- Advanced analytics (SMA/EMA charts, portfolio insights)
- Dark/Light theme toggle
- In-app notifications & alerts
- Multi-user competitions
- Community trading rooms

---

## 🤝 Contributing
Contributions are welcome! Follow these steps:
1. Fork the repo
2. Create a new feature branch
3. Commit changes
4. Create a pull request

---

## 🙏 Acknowledgements
- React & TailwindCSS team
- Spring Boot open-source community
- Dicebear for avatars
- Inspiration from Zerodha/Kite & Yahoo Finance UI

---

## 📜 License
This project is licensed under the **GNU General Public License (GPL v3)**.

Feel free to modify, distribute, and improve — freedom is encouraged as long as derivatives remain open-source.

---

Happy Trading Simulation! 🚀📊
