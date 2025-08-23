"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Stock {
  name: string
  ticker: string
  price: number
}

interface TradeModalProps {
  isOpen: boolean
  onClose: () => void
  stock: Stock | null
}

export function TradeModal({ isOpen, onClose, stock }: TradeModalProps) {
  const [tradeType, setTradeType] = React.useState("buy")
  const [quantity, setQuantity] = React.useState(1)
  const { toast } = useToast()

  const handleConfirmTrade = () => {
    toast({
      title: "Trade Successful!",
      description: `You have successfully ${
        tradeType === "buy" ? "bought" : "sold"
      } ${quantity} share(s) of ${stock?.ticker}.`,
    })
    onClose()
  }
  
  const estimatedCost = stock ? (stock.price * quantity).toFixed(2) : "0.00";

  if (!stock) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Trade {stock.ticker} - {stock.name}
          </DialogTitle>
          <DialogDescription>
            Current Price: ${stock.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Action</Label>
            <RadioGroup
              defaultValue="buy"
              className="col-span-3 flex gap-4"
              onValueChange={setTradeType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy">Buy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sell" id="sell" />
                <Label htmlFor="sell">Sell</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="col-span-3"
              min="1"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
             <Label className="text-right">Estimated</Label>
             <div className="col-span-3 font-semibold">${estimatedCost}</div>
           </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirmTrade}>Confirm Trade</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
