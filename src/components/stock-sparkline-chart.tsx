"use client"

import { Area, AreaChart } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

interface StockSparklineChartProps {
  data: { value: number }[]
  isPositive: boolean
}

export function StockSparklineChart({ data, isPositive }: StockSparklineChartProps) {
  const color = isPositive ? "hsl(var(--primary))" : "hsl(var(--destructive))";
  
  const chartConfig = {
    value: {
      color: color,
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[40px] w-[100px]">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <defs>
            <linearGradient id={`fill-${isPositive}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
        </defs>
        <Area
          dataKey="value"
          type="natural"
          fill={`url(#fill-${isPositive})`}
          stroke={color}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
