import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChartBarData } from '@/src/api/get-chart-bar-format'

interface ChartBarComponentData {
  dataListName: string
  chartBarData: ChartBarData[]
}

export function ChartBarComponent({
  dataListName,
  chartBarData,
}: ChartBarComponentData) {
  const chartConfig = {
    keyword: {
      label: 'Keyword',
      color: '#2563eb',
    },
    mobile: {
      label: 'Mobile',
      color: '#60a5fa',
    },
  } satisfies ChartConfig
  return (
    <>
      {chartBarData ? (
        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Barra</CardTitle>
            <CardDescription>{dataListName}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartBarData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : (
        <h1>Teste</h1>
      )}
    </>
  )
}
