'use client'
import { useMemo } from 'react'
import { Chart } from 'react-google-charts'

export default function GeoChart() {
  const data = useMemo(() => [
    ['País', 'Popularidade'],
    ['Brasil', 500],
    ['Portugal', 300],
    ['Estados Unidos', 200],
    ['Espanha', 150],
    ['Angola', 100],
  ], [])

  const options = {
    colorAxis: { colors: ['#e6f2ff', '#3b82f6'] },
    backgroundColor: 'transparent',
    datalessRegionColor: '#f0f0f0',
    defaultColor: '#f5f5f5',
  }

  return (
    <div className="h-full">
      <Chart
        chartType="GeoChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  )
}