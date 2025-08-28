
"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TradeModal } from "@/components/trade-modal"
import { marketStocks } from "@/lib/mock-data"

type Stock = (typeof marketStocks)[0]

export default function MarketPage() {
  const [search, setSearch] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedStock, setSelectedStock] = React.useState<Pick<Stock, 'name' | 'ticker' | 'price'> | null>(null)

  const handleTradeClick = (stock: Pick<Stock, 'name' | 'ticker' | 'price'>) => {
    setSelectedStock(stock)
    setIsModalOpen(true)
  }

  const filteredStocks = marketStocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(search.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Stock Market</CardTitle>
              <CardDescription>
                Browse and trade stocks available on the market.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks..."
                className="w-full pl-8 sm:w-[250px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change %</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell>
                    <Link href={`/dashboard/market/${stock.ticker}`} className="hover:underline">
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {stock.ticker}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ₹{stock.price.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      stock.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock.isPositive ? "+" : ""}
                    {stock.change.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => handleTradeClick({name: stock.name, ticker: stock.ticker, price: stock.price})}>
                      Trade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stock={selectedStock}
      />
    </motion.div>
  )
}
