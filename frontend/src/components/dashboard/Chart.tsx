'use client'

import { BarChart, Title, Card } from '@tremor/react';


// mock data waiting for fetching from backend
const chartdata = [
    {
    name: '6am',
    'Number of reservations': 2488,
    },
    {
    name: '7am',
    'Number of reservations': 1445,
    },
    {
    name: '8am',
    'Number of reservations': 743,
    },
    {
    name: '9am',
    'Number of reservations': 281,
    },
    {
    name: '10am',
    'Number of reservations': 251,
    },
    {
    name: '11am',
    'Number of reservations': 232,
    },
    {
    name: '12pm',
    'Number of reservations': 98,
    },
    {
    name: '1pm',
    'Number of reservations': 98,
    },
    {
        name: '2pm',
        'Number of reservations': 98,
    },
    {
        name: '3pm',
        'Number of reservations': 98,
    },
    {
        name: '4pm',
        'Number of reservations': 98,
    },
    {
        name: '5pm',
        'Number of reservations': 500,
    },
    {
        name: '6pm',
        'Number of reservations': 98,
    },
    {
        name: '7pm',
        'Number of reservations': 98,
    },
    {
        name: '8pm',
        'Number of reservations': 98,
    },
    {
        name: '9pm',
        'Number of reservations': 98,
    },
    {
        name: '10pm',
        'Number of reservations': 98,
    },
    {
        name: '11pm',
        'Number of reservations': 98,
    },
    {
        name: '12am',
        'Number of reservations': 98,
    }, 
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export const PeakHourChart = () => (
    
    <BarChart
        data={chartdata}
        index="name"
        categories={['Number of reservations']}
        colors={['#3D3D3D']}
        valueFormatter={dataFormatter}
        yAxisWidth={120}
        // onValueChange={(v) => console.log(v)}
        style={{ backgroundColor: '#B1B3AA' }}
        showLegend={true}
        showGridLines={true}
        barCategoryGap={0.5}
        noDataText='No data. Run your first test to get started!'   
        showTooltip={true}
        animationDuration={1000}
        showYAxis={true}
        showXAxis={true}
    />
);