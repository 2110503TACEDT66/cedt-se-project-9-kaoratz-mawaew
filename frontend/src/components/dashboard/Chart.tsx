'use client'
import { AreaChart, Card, Title  , EventProps } from '@tremor/react';
import { useState } from 'react';

const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

interface ChartInput {
    hour: number;
    actual: number;
    forecast: number;
}

export default function ChartComponent({ chartInput }: { chartInput: ChartInput[]}) {

    // const customTooltip = (props) => {
    //     const { payload, active } = props;
    //     if (!active || !payload) return null;
    //     return (
    //       <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
    //         {payload.map((category, idx) => (
    //           <div key={idx} className="flex flex-1 space-x-2.5">
    //             <div
    //               className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
    //             />
    //             <div className="space-y-1">
    //               <p className="text-tremor-content">{category.dataKey}</p>
    //               <p className="font-medium text-tremor-content-emphasis">
    //                 {category.value} hours 
    //               </p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     );
    // }; 

    const [value, setValue] = useState<EventProps>(null);
    return (
        <Card>
            <Title>Peak Hour Chart</Title>
            <AreaChart
                data={chartInput}
                index="hour"
                categories={['actual', 'forecast']}
                colors={["gray", 'stone']}
                valueFormatter={dataFormatter}
                yAxisWidth={120}
                onValueChange={(v) => setValue(v)}
                style={{ backgroundColor: '#B1B1B1' }}
                noDataText='No data.'
                showTooltip={true}
                animationDuration={1000}
                showYAxis={true}
                // customTooltip={customTooltip}
            />
        </Card>
    );
}
