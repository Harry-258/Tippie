'use client';

import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
import {BarChart, Gauge, gaugeClasses} from "@mui/x-charts";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Dashboard() {
    const xLabels = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
    ];
    // TODO bar chart: - Chart title
    //                 - Euro sign
    //                 - Format values
    // TODO tiles: - goals
    //             - call to AI prompt
    //             - stocks went up/down?

    return (
        <TileGrid rows={5} cols={5}>
            <Tile innerClassName="flex flex-col gap-4 justify-center" outerClassName="col-span-4">
                <span className="text-2xl font-bold">
                    Welcome, Jane!
                </span>
                <span className="text-lg">
                    168,8€
                </span>
            </Tile>
            <Tile outerClassName="col-span-1">
                <Stack width="100%" height="100%">
                    <Typography
                        variant="inherit"
                        component="span"
                        textAlign="center"
                        fontWeight="700"
                    >
                        Your Goal:
                    </Typography>
                    <Gauge
                        value={84.4}
                        margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
                        sx={() => ({
                            // [`& .${gaugeClasses.valueText}`]: {
                            //     fontSize: 40,
                            // },
                            [`& .${gaugeClasses.valueArc}`]: {
                                fill: '#DEF186',
                            },
                            // [`& .${gaugeClasses.referenceArc}`]: {
                            //     fill: theme.palette.text.disabled,
                            // },
                        })}
                        text={({value}) => `${value}%`}
                    />
                </Stack>
            </Tile>
            <Tile outerClassName="col-span-2 row-span-2" innerClassName="flex flex-col justify-center items-center font-bold">
                {/*<span className="font-semibold text-lg">Tips Received Over the Last Week</span>*/}
                <Stack width="95%" height="95%">
                    <Typography
                        variant="inherit"
                        component="span"
                        textAlign="center"
                    >
                        Tips Received Over the Last Week
                    </Typography>
                    <BarChart
                        grid={{ horizontal: true }}
                        margin={{ left: 0, right: 0 }}
                        series={[
                            {
                                data: [34, 0, 0, 29.5, 36, 37, 32.3],
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
                </Stack>
            </Tile>
            <Tile outerClassName="col-span-3">
                <span>
                    See the vision yet?
                </span>
            </Tile>
            <Tile outerClassName="col-span-2">
                <span>
                    Anotha one
                </span>
            </Tile>
            <Tile outerClassName="col-span-1">
                <span>
                    Got tips?
                </span>
            </Tile>
            <Tile outerClassName="col-span-3 row-span-2">
                <span>
                    Big boy tile
                </span>
            </Tile>
            <Tile outerClassName="col-span-2 row-span-2">
                <span>
                    Idk bro
                </span>
            </Tile>
        </TileGrid>
    )
}