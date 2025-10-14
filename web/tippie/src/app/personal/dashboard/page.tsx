'use client';

import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
import {BarChart} from "@mui/x-charts";

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
    // TODO: - Chart title
    //       - Euro sign
    //       - Format values

    return (
        <TileGrid rows={5} cols={5}>
            <Tile innerClassName="flex flex-col gap-4" outerClassName="col-span-3">
                <span className="text-2xl font-bold">
                    Welcome, Jane!
                </span>
                <span className="text-lg">
                    100€
                </span>
            </Tile>
            <Tile outerClassName="col-span-2">
                <span>
                    bruh
                </span>
            </Tile>
            <Tile outerClassName="col-span-2 row-span-2" innerClassName="flex flex-col gap-2 justify-center items-center">
                <span className="font-semibold text-lg">Tips Received Over the Last Week</span>
                <BarChart
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
                            label: 'Tips(€)'
                        }
                    ]}
                />
            </Tile>
            <Tile outerClassName="col-span-3">
                <span>
                    See the vision yet?
                </span>
            </Tile>
            <Tile outerClassName="col-span-1">
                <span>
                    Got tips?
                </span>
            </Tile>
            <Tile outerClassName="col-span-2">
                <span>
                    Anotha one
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