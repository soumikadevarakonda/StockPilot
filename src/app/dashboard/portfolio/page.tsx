
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { DollarSign, PlusCircle, Wallet } from "lucide-react"

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
import { Button } from "@/components/ui/button"
import { StockSparklineChart } from "@/components/stock-sparkline-chart"
import { portfolioHoldings, portfolioSummary } from "@/lib/mock-data"
import { AddFundsModal } from "@/components/add-funds-modal"
import { TransactionHistory } from "@/components/transaction-history"

export default function PortfolioPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(portfolioSummary.balance)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Invested Amount
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(portfolioSummary.invested)}
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center">
           <CardContent className="p-6">
             <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Funds
            </Button>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Holdings</CardTitle>
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

      <TransactionHistory />

      <AddFundsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  )
}
