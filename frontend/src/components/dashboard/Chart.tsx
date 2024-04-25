'use client'

import { BarChart, AreaChart, Card, Title } from '@tremor/react';
import { ChartDataItem } from '../../../interface'

// Define the type for the parameter
interface ChartPredictDataItem {
    hour: string;
    forecast: number;
}

type ChartData = ChartDataItem[];
type ChartPredictData = ChartPredictDataItem[];

const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

export default function PeakHourChart({ data, forecast }: { data: ChartData, forecast: ChartPredictData }) {
    const chartData = data.map((item, index) => ({
        hour: index,
        actual: item.count,
        forecast: forecast[index].forecast
    }));

    console.log(JSON.stringify(chartData));

    return (
        <Card>
            <Title>Peak Hour Chart</Title>
            <AreaChart
                data={chartData}
                index="hour"
                categories={['actual', 'forecast']}
                colors={["indigo", "cyan"]}
                valueFormatter={dataFormatter}
                yAxisWidth={120}
                // onValueChange={(v) => console.log(v)}
                style={{ backgroundColor: '#B1B1B1' }}
                showLegend={true}
                showGridLines={true}
                // barCategoryGap={0.5}
                noDataText='No data.'
                showTooltip={true}
                animationDuration={1000}
                showYAxis={true}
                showXAxis={true}
            />
        </Card>
    );
}
