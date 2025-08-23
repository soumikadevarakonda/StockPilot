"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Allocation</CardTitle>
        <CardDescription>
          Distribution of your investments across different stocks.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            >
                {stockAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
