
"use client"

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
import { Badge } from "@/components/ui/badge"
import { transactionHistory } from "@/lib/mock-data"

export function TransactionHistory() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          A log of all your recent account activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionHistory.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                <TableCell>
                   <Badge variant={txn.type === "DEPOSIT" ? "default" : txn.type === "BUY" ? "destructive" : "secondary"} className="capitalize">
                      {txn.type.toLowerCase()}
                   </Badge>
                </TableCell>
                <TableCell>{txn.description}</TableCell>
                <TableCell>
                    <Badge variant="outline">{txn.status}</Badge>
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    txn.amount >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatCurrency(txn.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
