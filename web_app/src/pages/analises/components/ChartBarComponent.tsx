import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartBarData } from '@/src/lib/types'

interface ChartBarComponentData {
  dataListName: string
  chartBarData: ChartBarData[]
}

export function ChartBarComponent({
  dataListName,
  chartBarData,
}: ChartBarComponentData) {
  return (
    <>
      {chartBarData && chartBarData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{dataListName}</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] w-full">
            <BarChart
              width={500}
              height={400}
              data={chartBarData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={150} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </CardContent>
        </Card>
      ) : (
        <h1>Nenhum dado disponível para exibição</h1>
      )}
    </>
  )
}
