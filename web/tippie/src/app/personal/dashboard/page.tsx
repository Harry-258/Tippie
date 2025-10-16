'use client';

import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
import Stack from '@mui/material/Stack';
import GoalGauge from "@/app/components/GoalGauge";
import TipsLastWeekChart from "@/app/components/TipsLastWeekChart";
import {LightbulbIcon, ClockIcon, PlusCircleIcon, ArrowRightIcon, ChartBarIcon, PiggyBankIcon} from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
    // TODO bar chart: - Add ChartBarIcon to title
    //                 - Format values
    // TODO tiles: - stocks went up/down?
    //             - auto-trading On/Off
    // TODO: make sidebar collapsible?

    const iconSize = 20;

    return (
        <TileGrid rows={6} cols={5}>
            <Tile innerClassName="flex flex-col gap-4 justify-center ml-2" outerClassName="col-span-full">
                <span className="text-2xl font-bold">
                    Welcome, Jane!
                </span>
                <span className="text-lg">
                    Balance: 168,8€
                </span>
            </Tile>
            <Tile outerClassName="col-span-2 row-span-2" innerClassName="flex flex-col justify-center items-center font-bold" redirectPage="Analytics">
                <Stack width="95%" height="95%">
                    <div className="flex flex-row gap-1 items-center font-bold text-lg">
                        <ChartBarIcon size={iconSize} weight="bold"/>
                        <span>
                            Tips Received Over the Last Week
                        </span>
                    </div>
                    <TipsLastWeekChart/>
                </Stack>
            </Tile>
            <Tile outerClassName="col-span-1 row-span-1">
                <div/>
            </Tile>
            <Tile outerClassName="col-span-2 row-span-2" redirectPage="Analytics">
                <Stack width="100%" height="100%">
                    <div className="flex flex-row gap-1 items-center justify-center font-bold text-lg">
                        <PiggyBankIcon size={iconSize} weight="bold"/>
                        <span>
                            Your Saving Goal
                        </span>
                    </div>
                    <GoalGauge/>
                </Stack>
            </Tile>
            <Tile outerClassName="col-span-1 row-span-1">
                <div/>
            </Tile>
            <Tile outerClassName="col-span-3 row-span-2" innerClassName="flex flex-col gap-1">
                <span className="text-lg font-bold flex flex-row gap-1 items-center ml-2">
                    <LightbulbIcon size={iconSize} weight="bold"/>
                    Want More Expert Trading Advice?
                </span>
                <span className="ml-2">
                    Jump back into your conversations or start a new one!
                </span>

                <Link
                    href="/personal/advice"
                    className="hover:shadow-md transition-all duration-300
                        hover:scale-[1.01] rounded-lg bg-white p-4
                        shadow-sm border border-action/60 mt-5"
                >
                    <div className="flex gap-3 items-center">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-action flex items-center justify-center">
                            <ClockIcon className="text-primary" size={iconSize}/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-primary/70">
                                Last chat with <strong className="text-primary">Trading Coach</strong> • 2 days ago
                            </span>
                            <p className="mt-1 text-primary text-sm leading-snug">
                                “Remember to watch the EUR/USD resistance level this week — if it breaks, you could see a short-term reversal opportunity.”
                            </p>
                        </div>
                    </div>
                </Link>

                <div className="flex gap-2">
                    <Link href={'/personal/advice'} className="mt-4">
                        <div className="flex">
                            <div className="button flex gap-1 items-center shadow-md">
                                <ArrowRightIcon className="text-primary" size={iconSize}/>
                                Continue Conversation
                            </div>
                        </div>
                    </Link>
                    <Link href={'/personal/advice'} className="mt-4">
                        <div className="flex">
                            <div className="button flex gap-1 items-center shadow-md">
                                <PlusCircleIcon className="text-primary" size={iconSize}/>
                                New Conversation
                            </div>
                        </div>
                    </Link>
                </div>
            </Tile>
        </TileGrid>
    )
}