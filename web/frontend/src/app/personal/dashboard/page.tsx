'use client';

import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import Stack from '@mui/material/Stack';
import GoalGauge from '@/app/components/GoalGauge';
import TipsLastWeekChart from '@/app/components/TipsLastWeekChart';
import {
    ChartBarIcon,
    PiggyBankIcon,
    BriefcaseIcon,
    ArrowUpRightIcon,
    ChartLineUpIcon,
} from '@phosphor-icons/react';
import React from 'react';
import ChatSuggestion from '@/app/components/ChatSuggestion';
import { iconSize } from '@/app/util/util';

export default function Dashboard() {
    // TODO tiles: - stocks went up/down?
    // TODO: make sidebar collapsible?

    const [autoTrading, setAutoTrading] = React.useState(false);

    function toggleAutoTrading() {
        // TODO: Make backend call
        console.log(autoTrading);
        setAutoTrading(!autoTrading);
    }

    return (
        <TileGrid rows={6} cols={10}>
            <Tile
                innerClassName="flex flex-col gap-4 justify-center ml-2"
                outerClassName="col-span-full"
            >
                <span className="text-2xl font-bold">Welcome, Jane!</span>
                <span className="text-lg">Balance: 168,8€</span>
            </Tile>

            <Tile
                outerClassName="col-span-4 row-span-2"
                innerClassName="flex flex-col justify-center items-center font-bold"
                redirectPage="Analytics"
            >
                <Stack width="95%" height="95%">
                    <div className="flex flex-row gap-1 items-center font-bold text-lg">
                        <ChartBarIcon size={iconSize} weight="bold" />
                        <span>Tips Received Over the Last Week</span>
                    </div>
                    <TipsLastWeekChart />
                </Stack>
            </Tile>

            <Tile
                outerClassName="col-span-2 row-span-1"
                innerClassName="flex flex-col justify-between items-center text-lg p-6"
            >
                <div className="flex flex-row items-center gap-2 text-center">
                    <ChartLineUpIcon size={iconSize} weight="bold" className="text-primary" />
                    <span className="text-lg font-bold tracking-wide">Auto Trading</span>
                </div>

                <div className="flex flex-col items-center justify-center h-full mt-4 space-y-3">
                    <div
                        onClick={toggleAutoTrading}
                        className="relative flex items-center justify-between w-32 h-12 px-3 rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner cursor-pointer select-none transition-transform active:scale-95"
                    >
                        <span
                            className={`text-sm font-semibold transition-opacity ${
                                autoTrading ? 'text-primary opacity-100' : 'opacity-50'
                            }`}
                        >
                            ON
                        </span>
                        <span
                            className={`text-sm font-semibold transition-opacity ${
                                !autoTrading ? 'text-red-500 opacity-100' : 'opacity-50'
                            }`}
                        >
                            OFF
                        </span>

                        <div
                            className={`absolute top-1/2 -translate-y-1/2 h-10 w-14 rounded-xl bg-gradient-to-b from-white to-gray-300 shadow-md border border-gray-300 transition-transform duration-300 ease-in-out ${
                                autoTrading ? 'translate-x-[55px]' : 'translate-x-[-5px]'
                            }`}
                        />
                    </div>
                </div>
            </Tile>

            <Tile outerClassName="col-span-4 row-span-2" redirectPage="Analytics">
                <Stack width="100%" height="100%">
                    <div className="flex flex-row gap-1 items-center justify-center font-bold text-lg">
                        <PiggyBankIcon size={iconSize} weight="bold" />
                        <span>Your Saving Goal</span>
                    </div>
                    <GoalGauge />
                </Stack>
            </Tile>

            <Tile
                outerClassName="col-span-2 row-span-1"
                innerClassName="flex flex-col justify-between items-center text-lg p-6"
                redirectPage="Trading"
            >
                <div className="flex flex-row items-center gap-2 text-center">
                    <BriefcaseIcon size={iconSize} weight="bold" className="text-primary" />
                    <span className="text-lg font-bold tracking-wide">Portfolio</span>
                </div>

                <div className="flex flex-row items-center justify-center h-full text-3xl font-light mt-2">
                    <span className="mr-1">15%</span>
                    <ArrowUpRightIcon size={28} className="text-action" weight="bold" />
                </div>
            </Tile>

            <Tile outerClassName="col-span-5 row-span-2">
                <ChatSuggestion />
            </Tile>

            <Tile outerClassName="col-span-5 row-span-2">
                <div />
            </Tile>

            <Tile outerClassName="col-span-full">
                <div />
            </Tile>
        </TileGrid>
    );
}
