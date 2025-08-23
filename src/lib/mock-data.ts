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

export const marketStocks = [
  {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    price: 172.25 * USD_TO_INR_RATE,
    change: 1.5,
    isPositive: true,
  },
  {
    name: 'Google LLC',
    ticker: 'GOOGL',
    price: 2854.76 * USD_TO_INR_RATE,
    change: -0.8,
    isPositive: false,
  },
  {
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    price: 931.35 * USD_TO_INR_RATE,
    change: 3.2,
    isPositive: true,
  },
  {
    name: 'Amazon.com, Inc.',
    ticker: 'AMZN',
    price: 3384.2 * USD_TO_INR_RATE,
    change: -0.2,
    isPositive: false,
  },
  {
    name: 'Microsoft Corp.',
    ticker: 'MSFT',
    price: 305.22 * USD_TO_INR_RATE,
    change: 0.5,
    isPositive: true,
  },
  {
    name: 'NVIDIA Corp.',
    ticker: 'NVDA',
    price: 220.5 * USD_TO_INR_RATE,
    change: 2.1,
    isPositive: true,
  },
  {
    name: 'Meta Platforms, Inc.',
    ticker: 'META',
    price: 210.41 * USD_TO_INR_RATE,
    change: -1.1,
    isPositive: false,
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
