import {BarChart} from "@mui/x-charts";

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

    // TODO: get data from backend

    return (
        <BarChart
            grid={{ horizontal: true }}
            margin={{ left: 0, right: 0 }}
            series={[
                {
                    data: data,
                    // label: "Tips (€)",
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
                },
            ]}
            yAxis={[
                {
                    label: 'Tips(€)',
                }
            ]}
        />
    )
}