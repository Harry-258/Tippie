import { BarChart } from '@mui/x-charts';
import { SeriesValueFormatter } from '@mui/x-charts/internals';
import { ChartProps } from '@/app/util/types';

export default function Chart({ data, labels }: ChartProps) {
    const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dataFormatter: SeriesValueFormatter<number | null> = value => `${value}€`;
    const colors = ['#DEF186', '#1F1E30'];
    const series = [];

    for (let index = 0; index < data.length; index++) {
        series.push({
            data: data[index],
            valueFormatter: dataFormatter,
            label: labels[index],
            color: colors[index],
        });
    }

    return (
        <BarChart
            borderRadius={10}
            grid={{ horizontal: true }}
            margin={{ left: 0, right: 0 }}
            series={series}
            xAxis={[
                {
                    id: 'tipBarChartCategories',
                    data: xLabels,
                    tickPlacement: 'middle',
                    tickLabelPlacement: 'middle',
                    labelStyle: { fontWeight: 600 },
                },
            ]}
            yAxis={[
                {
                    labelStyle: { fontWeight: 600 },
                },
            ]}
        />
    );
}
