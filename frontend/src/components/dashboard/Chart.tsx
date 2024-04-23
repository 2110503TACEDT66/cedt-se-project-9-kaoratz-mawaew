'use client'

import { BarChart, Title, Card } from '@tremor/react';
import { ChartDataItem } from '../../../interface'

// Define the type for the parameter
type ChartData = ChartDataItem[];

const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

export default function PeakHourChart({ data }: { data: ChartData }) {
    return (
        <BarChart
            data={data}
            index="name"
            categories={['count']}
            colors={['#3D3D3D']}
            valueFormatter={dataFormatter}
            yAxisWidth={120}
            // onValueChange={(v) => console.log(v)}
            style={{ backgroundColor: '#B1B1B1' }}
            showLegend={true}
            showGridLines={true}
            barCategoryGap={0.5}
            noDataText='No data.'
            showTooltip={true}
            animationDuration={1000}
            showYAxis={true}
            showXAxis={true}
            maxValue={20}
        />
    );
}