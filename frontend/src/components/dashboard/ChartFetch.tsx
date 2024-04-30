import { ChartDataItem, ChartPredictDataItem } from '../../../interface'
import ChartComponent from './Chart';

type ChartData = ChartDataItem[];
type ChartPredictData = ChartPredictDataItem[];

export default function PeakHourChart({ data, forecast }: { data: ChartData, forecast: ChartPredictData }) {
    const chartData = data.map((item, index) => ({
        hour: index,
        actual: item.count,
        forecast: forecast && forecast.length > 0 ? forecast[index]?.forecast : 0

    }));
    return (
        <ChartComponent chartInput={chartData} />
    );

}