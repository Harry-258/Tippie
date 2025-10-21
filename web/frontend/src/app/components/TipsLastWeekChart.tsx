import {BarChart} from "@mui/x-charts";
import {SeriesValueFormatter} from "@mui/x-charts/internals";

export default function TipsLastWeekChart() {
    const xLabels = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
    ];
    const data = [
        34,
        0,
        0,
        29.5,
        36,
        37,
        32.3
    ]

    const dataFormatter: SeriesValueFormatter<number | null> = (value: number | null) => {return `${value}€`};

    // TODO: get data from backend

    return (
        <BarChart
            borderRadius={10}
            grid={{ horizontal: true }}
            margin={{ left: 0, right: 0 }}
            series={[
                {
                    data: data,
                    valueFormatter: dataFormatter
                }
            ]}
            xAxis={[
                {
                    id: 'tipBarChartCategories',
                    data: xLabels,
                    tickPlacement: 'middle',
                    tickLabelPlacement: 'middle',
                    colorMap: {
                        type: 'piecewise',
                        thresholds: [0],
                        colors: ['#DEF186'],
                    },
                    // label: 'Day',
                    labelStyle: { fontWeight: 600 },
                },
            ]}
            yAxis={[
                {
                    // label: 'Tips (€)',
                    labelStyle: { fontWeight: 600 },
                }
            ]}
        />
    )
}