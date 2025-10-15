'use client';

import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import GoalGauge from "@/app/components/GoalGauge";
import TipsLastWeekChart from "@/app/components/TipsLastWeekChart";

export default function Dashboard() {
    // TODO bar chart: - Euro sign
    //                 - Format values
    // TODO tiles: - call to AI prompt
    //             - stocks went up/down?

    // Want to get more advice? Jump back into your conversations!

    return (
        <TileGrid rows={5} cols={6}>
            <Tile innerClassName="flex flex-col gap-4 justify-center" outerClassName="col-span-full">
                <span className="text-2xl font-bold">
                    Welcome, Jane!
                </span>
                <span className="text-lg">
                    168,8€
                </span>
            </Tile>
            <Tile outerClassName="col-span-2 row-span-2" innerClassName="flex flex-col justify-center items-center font-bold" redirectPage="Analytics">
                {/*<span className="font-semibold text-lg">Tips Received Over the Last Week</span>*/}
                <Stack width="95%" height="95%">
                    <Typography
                        variant="inherit"
                        component="span"
                        textAlign="center"
                    >
                        Tips Received Over the Last Week
                    </Typography>
                    <TipsLastWeekChart/>
                </Stack>
            </Tile>
            <Tile outerClassName="col-span-1" redirectPage="Analytics">
                <Stack width="100%" height="100%">
                    <Typography
                        variant="inherit"
                        component="span"
                        textAlign="center"
                        fontWeight="700"
                    >
                        Savings Goal
                    </Typography>
                    <GoalGauge/>
                </Stack>
            </Tile>
            <Tile outerClassName="col-span-3">
                <span>
                    See the vision yet?
                </span>
            </Tile>
            <Tile outerClassName="col-span-4" innerClassName="" redirectPage="Advice">
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