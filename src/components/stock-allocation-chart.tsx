
"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { stockAllocation } from "@/lib/mock-data"

const chartConfig = {
  value: {
    label: "Value",
  },
  ...stockAllocation.reduce((acc, cur) => {
    acc[cur.name] = { label: cur.name, color: cur.fill };
    return acc;
  }, {}),
};

export function StockAllocationChart() {
  const [activeStock, setActiveStock] = React.useState(stockAllocation[0].name);

  const activeValue = React.useMemo(() => 
    stockAllocation.find(s => s.name === activeStock)?.value
  , [activeStock]);
  
  const totalValue = React.useMemo(
    () => stockAllocation.reduce((acc, cur) => acc + cur.value, 0),
    []
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Allocation</CardTitle>
        <CardDescription>
          Distribution of your investments across different stocks.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
         <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={stockAllocation}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              onMouseEnter={(_, index) => {
                 setActiveStock(stockAllocation[index].name);
              }}
            >
            </Pie>
             <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
       <CardContent className="flex flex-col items-center justify-center space-y-2 text-sm">
           <div className="flex w-full items-center justify-center p-2 font-medium">
             Active: {activeStock}
           </div>
           <div className="flex w-full items-center justify-between p-2">
             <span className="text-muted-foreground">Value</span>
             <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(activeValue || 0)}</span>
           </div>
            <div className="flex w-full items-center justify-between p-2">
              <span className="text-muted-foreground">Percentage</span>
              <span>{(((activeValue || 0) / totalValue) * 100).toFixed(2)}%</span>
            </div>
      </CardContent>
    </Card>
  )
}
