
"use client"

import * as React from "react"
import { notFound, useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { DollarSign, Percent, BarChart, Briefcase } from "lucide-react"

import { marketStocks } from "@/lib/mock-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TradeModal } from "@/components/trade-modal"

export default function StockDetailPage() {
  const params = useParams()
  const ticker = params.ticker as string
  
  const stock = marketStocks.find(
    (s) => s.ticker.toLowerCase() === ticker.toLowerCase()
  )

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  if (!stock) {
    notFound()
  }
  
  const tradeableStock = {
    name: stock.name,
    ticker: stock.ticker,
    price: stock.price,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatLargeNumber = (num: number) => {
    if (num >= 1_00_00_000) {
      return `${(num / 1_00_00_000).toFixed(2)} Cr`
    }
    if (num >= 1_00_000) {
      return `${(num / 1_00_000).toFixed(2)} L`
    }
    return num.toLocaleString()
  }

  const chartConfig = {
    value: {
      label: "Price",
    },
  }
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="font-bold col-span-2">{label}</div>
            <div className="text-sm text-muted-foreground">Open:</div>
            <div className="text-sm font-mono text-right">{formatCurrency(data.open)}</div>
            <div className="text-sm text-muted-foreground">High:</div>
            <div className="text-sm font-mono text-right">{formatCurrency(data.high)}</div>
            <div className="text-sm text-muted-foreground">Low:</div>
            <div className="text-sm font-mono text-right">{formatCurrency(data.low)}</div>
            <div className="text-sm text-muted-foreground">Close:</div>
            <div className="text-sm font-mono text-right">{formatCurrency(data.close)}</div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{stock.name} ({stock.ticker})</h1>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight">
              {formatCurrency(stock.price)}
            </span>
            <span
              className={`text-xl font-semibold ${
                stock.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {stock.isPositive ? "+" : ""}
              {stock.change.toFixed(2)}%
            </span>
          </div>
        </div>
        <Button size="lg" onClick={() => setIsModalOpen(true)}>Trade</Button>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price History (1Y)</CardTitle>
          <CardDescription>
            Historical performance of {stock.ticker}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={stock.history}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  domain={['dataMin - 20', 'dataMax + 20']}
                  hide
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="low" stackId="a" fill="transparent" />
                <Bar dataKey="open" stackId="b" barSize={2}>
                    {stock.history.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.close > entry.open ? "hsl(var(--primary))" : "hsl(var(--destructive))"} />
                    ))}
                </Bar>
                 <Bar dataKey="close" stackId="c" barSize={8}>
                    {stock.history.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.close > entry.open ? "hsl(var(--primary))" : "hsl(var(--destructive))"} />
                    ))}
                 </Bar>
                <Bar dataKey="high" stackId="d" barSize={2}>
                    {stock.history.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.close > entry.open ? "hsl(var(--primary))" : "hsl(var(--destructive))"} />
                    ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{formatLargeNumber(stock.marketCap)}
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P/E Ratio</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stock.peRatio.toFixed(2)}</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dividend Yield</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stock.dividendYield.toFixed(2)}%</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatLargeNumber(stock.volume)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About {stock.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {stock.description}
          </p>
        </CardContent>
      </Card>

      <TradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stock={tradeableStock}
      />
    </motion.div>
  )
}
