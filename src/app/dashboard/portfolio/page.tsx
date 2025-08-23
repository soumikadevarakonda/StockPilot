"use client"

import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StockSparklineChart } from "@/components/stock-sparkline-chart"
import { portfolioHoldings } from "@/lib/mock-data"

export default function PortfolioPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>My Portfolio</CardTitle>
          <CardDescription>
            A detailed overview of your current stock holdings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Qty.</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Avg. Price</TableHead>
                <TableHead className="hidden text-right md:table-cell">7D Chart</TableHead>
                <TableHead className="text-right">P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioHoldings.map((holding) => (
                <TableRow key={holding.ticker}>
                  <TableCell>
                    <div className="font-medium">{holding.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {holding.ticker}
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-right sm:table-cell">
                    {holding.quantity}
                  </TableCell>
                  <TableCell className="hidden text-right sm:table-cell">
                    {formatCurrency(holding.avgPrice)}
                  </TableCell>
                  <TableCell className="hidden items-center justify-end md:flex">
                     <StockSparklineChart data={holding.history} isPositive={holding.profitLoss >= 0} />
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      holding.profitLoss >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatCurrency(holding.profitLoss)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
