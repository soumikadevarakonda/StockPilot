export const user = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatar: 'https://placehold.co/100x100.png',
};

export const portfolioSummary = {
  balance: 25000.75,
  invested: 75000.25,
  profitLoss: 1250.6,
  isPositive: true,
};

export const portfolioGrowth = [
  { date: 'Jan 24', value: 73000 },
  { date: 'Feb 24', value: 74500 },
  { date: 'Mar 24', value: 78000 },
  { date: 'Apr 24', value: 77000 },
  { date: 'May 24', value: 79000 },
  { date: 'Jun 24', value: 81250 },
];

export const stockAllocation = [
  { name: 'AAPL', value: 400, fill: 'var(--color-chart-1)' },
  { name: 'GOOGL', value: 300, fill: 'var(--color-chart-2)' },
  { name: 'TSLA', value: 200, fill: 'var(--color-chart-3)' },
  { name: 'AMZN', value: 100, fill: 'var(--color-chart-4)' },
];

export const marketStocks = [
  {
    name: 'Apple Inc.',
    ticker: 'AAPL',
    price: 172.25,
    change: 1.5,
    isPositive: true,
  },
  {
    name: 'Google LLC',
    ticker: 'GOOGL',
    price: 2854.76,
    change: -0.8,
    isPositive: false,
  },
  {
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    price: 931.35,
    change: 3.2,
    isPositive: true,
  },
  {
    name: 'Amazon.com, Inc.',
    ticker: 'AMZN',
    price: 3384.2,
    change: -0.2,
    isPositive: false,
  },
  {
    name: 'Microsoft Corp.',
    ticker: 'MSFT',
    price: 305.22,
    change: 0.5,
    isPositive: true,
  },
  {
    name: 'NVIDIA Corp.',
    ticker: 'NVDA',
    price: 220.5,
    change: 2.1,
    isPositive: true,
  },
  {
    name: 'Meta Platforms, Inc.',
    ticker: 'META',
    price: 210.41,
    change: -1.1,
    isPositive: false,
  },
];

export const portfolioHoldings = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    avgPrice: 150.75,
    currentPrice: 172.25,
    profitLoss: (172.25 - 150.75) * 50,
    history: [
      { value: 165 },
      { value: 168 },
      { value: 167 },
      { value: 170 },
      { value: 175 },
      { value: 172.25 },
    ],
  },
  {
    ticker: 'GOOGL',
    name: 'Google LLC',
    quantity: 10,
    avgPrice: 2900.0,
    currentPrice: 2854.76,
    profitLoss: (2854.76 - 2900.0) * 10,
    history: [
      { value: 2880 },
      { value: 2860 },
      { value: 2875 },
      { value: 2850 },
      { value: 2840 },
      { value: 2854.76 },
    ],
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    quantity: 20,
    avgPrice: 850.5,
    currentPrice: 931.35,
    profitLoss: (931.35 - 850.5) * 20,
    history: [
      { value: 900 },
      { value: 910 },
      { value: 905 },
      { value: 920 },
      { value: 925 },
      { value: 931.35 },
    ],
  },
];
