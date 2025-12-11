import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartBarData } from '@/src/lib/types'

interface ChartLineComponentProps {
  dataListName: string
  chartBarData: ChartBarData[]
}

export function ChartLineComponent({
  dataListName,
  chartBarData,
}: ChartLineComponentProps) {
  const chartLineData = [...chartBarData].sort(
    (a, b) => Number(a.name) - Number(b.name),
  )

  return (
    <>
      {chartBarData && chartBarData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{dataListName}</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] w-full">
            <LineChart
              width={500}
              height={400}
              data={chartLineData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </CardContent>
        </Card>
      ) : (
        <h1>Nenhum dado disponível para exibição</h1>
      )}
    </>
  )
}
