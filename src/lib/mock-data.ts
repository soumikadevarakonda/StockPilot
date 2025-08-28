
export const user = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatar: 'https://placehold.co/100x100.png',
};

const USD_TO_INR_RATE = 83;

export const portfolioSummary = {
  balance: 25000.75 * USD_TO_INR_RATE,
  invested: 75000.25 * USD_TO_INR_RATE,
  profitLoss: 1250.6 * USD_TO_INR_RATE,
  isPositive: true,
};

export const portfolioGrowth = [
  { date: 'Jan 25', value: 73000 * USD_TO_INR_RATE },
  { date: 'Feb 25', value: 74500 * USD_TO_INR_RATE },
  { date: 'Mar 25', value: 78000 * USD_TO_INR_RATE },
  { date: 'Apr 25', value: 77000 * USD_TO_INR_RATE },
  { date: 'May 25', value: 79000 * USD_TO_INR_RATE },
  { date: 'Jun 25', value: 81250 * USD_TO_INR_RATE },
];

export const stockAllocation = [
  { name: 'AAPL', value: 400 * USD_TO_INR_RATE, fill: 'var(--color-chart-1)' },
  { name: 'GOOGL', value: 300 * USD_TO_INR_RATE, fill: 'var(--color-chart-2)' },
  { name: 'TSLA', value: 200 * USD_TO_INR_RATE, fill: 'var(--color-chart-3)' },
  { name: 'AMZN', value: 100 * USD_TO_INR_RATE, fill: 'var(--color-chart-4)' },
];

const generateHistory = (basePrice: number, months: number, volatility: number, isPositive: boolean) => {
  const history = [];
  let currentPrice = basePrice;
  const trend = isPositive ? 1 : -1;

  for (let i = 0; i < months; i++) {
    const change = (Math.random() - 0.5 + (trend * 0.1)) * volatility * currentPrice;
    currentPrice += change;
    const date = new Date(2025, 11 - (months - 1 - i), 1);
    history.push({
      date: date.toLocaleString('default', { month: 'short' }),
      value: Math.max(0, currentPrice * USD_TO_INR_RATE)
    });
  }
  return history;
}

export const marketStocks = [
  {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    price: 172.25 * USD_TO_INR_RATE,
    change: 1.5,
    isPositive: true,
    marketCap: 2.8 * 1e12 * USD_TO_INR_RATE,
    peRatio: 28.5,
    dividendYield: 0.54,
    volume: 50.2 * 1e6,
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.',
    history: generateHistory(172.25, 12, 0.05, true),
  },
  {
    name: 'Google LLC',
    ticker: 'GOOGL',
    price: 2854.76 * USD_TO_INR_RATE,
    change: -0.8,
    isPositive: false,
    marketCap: 1.9 * 1e12 * USD_TO_INR_RATE,
    peRatio: 26.8,
    dividendYield: 0.0,
    volume: 1.1 * 1e6,
    description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
    history: generateHistory(2854.76, 12, 0.06, false),
  },
  {
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    price: 931.35 * USD_TO_INR_RATE,
    change: 3.2,
    isPositive: true,
    marketCap: 935 * 1e9 * USD_TO_INR_RATE,
    peRatio: 120.3,
    dividendYield: 0.0,
    volume: 25.6 * 1e6,
    description: 'Tesla, Inc. designs, develops, manufactures, sells and leases electric vehicles and energy generation and storage systems, and offers services related to its products.',
    history: generateHistory(931.35, 12, 0.1, true),
  },
  {
    name: 'Amazon.com, Inc.',
    ticker: 'AMZN',
    price: 3384.2 * USD_TO_INR_RATE,
    change: -0.2,
    isPositive: false,
    marketCap: 1.72 * 1e12 * USD_TO_INR_RATE,
    peRatio: 60.7,
    dividendYield: 0.0,
    volume: 2.5 * 1e6,
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS).',
    history: generateHistory(3384.20, 12, 0.07, false),
  },
  {
    name: 'Microsoft Corp.',
    ticker: 'MSFT',
    price: 305.22 * USD_TO_INR_RATE,
    change: 0.5,
    isPositive: true,
    marketCap: 2.28 * 1e12 * USD_TO_INR_RATE,
    peRatio: 33.1,
    dividendYield: 0.81,
    volume: 28.9 * 1e6,
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its Productivity and Business Processes segment offers Office, Exchange, SharePoint, Microsoft Teams, Office 365 Security and Compliance, and more.',
    history: generateHistory(305.22, 12, 0.04, true),
  },
  {
    name: 'NVIDIA Corp.',
    ticker: 'NVDA',
    price: 220.5 * USD_TO_INR_RATE,
    change: 2.1,
    isPositive: true,
    marketCap: 551 * 1e9 * USD_TO_INR_RATE,
    peRatio: 75.4,
    dividendYield: 0.07,
    volume: 45.7 * 1e6,
    description: 'NVIDIA Corporation operates as a visual computing company worldwide. It operates in two segments, Graphics and Compute & Networking.',
    history: generateHistory(220.5, 12, 0.12, true),
  },
  {
    name: 'Meta Platforms, Inc.',
    ticker: 'META',
    price: 210.41 * USD_TO_INR_RATE,
    change: -1.1,
    isPositive: false,
    marketCap: 580 * 1e9 * USD_TO_INR_RATE,
    peRatio: 15.2,
    dividendYield: 0.0,
    volume: 30.1 * 1e6,
    description: 'Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and in-home devices.',
    history: generateHistory(210.41, 12, 0.08, false),
  },
];

export const portfolioHoldings = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    avgPrice: 150.75 * USD_TO_INR_RATE,
    currentPrice: 172.25 * USD_TO_INR_RATE,
    profitLoss: (172.25 - 150.75) * 50 * USD_TO_INR_RATE,
    history: [
      { value: 165 * USD_TO_INR_RATE },
      { value: 168 * USD_TO_INR_RATE },
      { value: 167 * USD_TO_INR_RATE },
      { value: 170 * USD_TO_INR_RATE },
      { value: 175 * USD_TO_INR_RATE },
      { value: 172.25 * USD_TO_INR_RATE },
    ],
  },
  {
    ticker: 'GOOGL',
    name: 'Google LLC',
    quantity: 10,
    avgPrice: 2900.0 * USD_TO_INR_RATE,
    currentPrice: 2854.76 * USD_TO_INR_RATE,
    profitLoss: (2854.76 - 2900.0) * 10 * USD_TO_INR_RATE,
    history: [
      { value: 2880 * USD_TO_INR_RATE },
      { value: 2860 * USD_TO_INR_RATE },
      { value: 2875 * USD_TO_INR_RATE },
      { value: 2850 * USD_TO_INR_RATE },
      { value: 2840 * USD_TO_INR_RATE },
      { value: 2854.76 * USD_TO_INR_RATE },
    ],
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    quantity: 20,
    avgPrice: 850.5 * USD_TO_INR_RATE,
    currentPrice: 931.35 * USD_TO_INR_RATE,
    profitLoss: (931.35 - 850.5) * 20 * USD_TO_INR_RATE,
    history: [
      { value: 900 * USD_TO_INR_RATE },
      { value: 910 * USD_TO_INR_RATE },
      { value: 905 * USD_TO_INR_RATE },
      { value: 920 * USD_TO_INR_RATE },
      { value: 925 * USD_TO_INR_RATE },
      { value: 931.35 * USD_TO_INR_RATE },
    ],
  },
];

export const transactionHistory = [
  {
    id: "txn_1",
    date: "2025-06-15",
    type: "DEPOSIT",
    description: "Initial virtual funds",
    amount: 100000 * USD_TO_INR_RATE,
    status: "Completed",
  },
  {
    id: "txn_2",
    date: "2025-06-16",
    type: "BUY",
    description: "Buy 50 AAPL @ ₹12517.25",
    amount: -50 * 150.75 * USD_TO_INR_RATE,
    status: "Completed",
  },
    {
    id: "txn_3",
    date: "2025-06-17",
    type: "BUY",
    description: "Buy 10 GOOGL @ ₹240700.00",
    amount: -10 * 2900.0 * USD_TO_INR_RATE,
    status: "Completed",
  },
  {
    id: "txn_4",
    date: "2025-06-18",
    type: "SELL",
    description: "Sell 5 TSLA @ ₹70591.50",
    amount: 5 * 850.50 * USD_TO_INR_RATE,
    status: "Completed",
  },
  {
    id: "txn_5",
    date: "2025-06-20",
    type: "DEPOSIT",
    description: "Added virtual funds",
    amount: 10000 * USD_TO_INR_RATE,
    status: "Completed",
  },
];

export const marketNews = [
  {
    id: 'news_1',
    source: 'The Economic Times',
    date: '2025-06-21',
    headline: 'Tech Stocks Rally as Inflation Fears Subside',
    summary: 'Major tech stocks, including Apple and Microsoft, saw significant gains today as new data suggests inflation may be cooling down, reassuring investors.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Tech', 'Market Rally'],
    url: '#',
  },
  {
    id: 'news_2',
    source: 'Reuters',
    date: '2025-06-21',
    headline: 'Tesla Announces Breakthrough in Battery Technology',
    summary: 'Tesla shares surged after the company revealed a new battery that promises longer range and lower costs, potentially disrupting the EV market.',
    image: 'https://placehold.co/600x400.png',
    tags: ['EV', 'Technology', 'TSLA'],
    url: '#',
  },
  {
    id: 'news_3',
    source: 'Bloomberg',
    date: '2025-06-20',
    headline: 'Federal Reserve Holds Interest Rates Steady',
    summary: 'The Federal Reserve has decided to keep interest rates unchanged, citing a need for more economic data before making further adjustments.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Economy', 'Federal Reserve'],
    url: '#',
  },
  {
    id: 'news_4',
    source: 'The Wall Street Journal',
    date: '2025-06-20',
    headline: 'Amazon Expands into Healthcare with New Acquisition',
    summary: 'Amazon continues its expansion into the healthcare sector by acquiring a major telehealth provider, sending ripples through the industry.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Healthcare', 'Acquisition', 'AMZN'],
    url: '#',
  },
];
