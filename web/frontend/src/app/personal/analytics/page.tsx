'use client';

import React, { useContext } from 'react';
import Tile from '@/app/components/Tile';
import { AnalyticsContext, groupTipsByDay, iconSize } from '@/app/util/util';
import Chart from '@/app/components/Chart';
import {
    ChartLineIcon,
    CurrencyDollarIcon,
    EnvelopeIcon,
    PiggyBankIcon,
    StarIcon,
    ThumbsUpIcon,
} from '@phosphor-icons/react';
import GoalGauge from '@/app/components/GoalGauge';
import Stack from '@mui/material/Stack';
import { StyledRating, StyledTeamAverageRating } from '@/app/components/StarRating';
import { LineChart } from '@mui/x-charts';

export default function Analytics() {
    const { feedback, tips, totalTips, averageRating } = useContext(AnalyticsContext);
    const tipChartData = groupTipsByDay(tips);

    const mockedAverageRatings = [4, 4.5, 4.67, 4.75, 4.4, 4.5, 4.57, 4.44, 4.22];
    const mockedAverageRatingsTimestamps = [
        1764583200000, 1764669600000, 1764756000000, 1764842400000, 1764928800000, 1765015200000,
        1765101600000, 1765188000000, 1765274400000,
    ];

    function getColSpan(feedback?: string) {
        if (!feedback) {
            return 'col-span-1';
        }

        const length = feedback.length;
        if (length > 40) {
            return 'col-span-3';
        } else if (length > 30) {
            return 'col-span-2';
        }
        return 'col-span-1';
    }

    return (
        <div className="h-screen">
            <div className="flex flex-col gap-5 overflow-y-auto h-full py-10 hide-scrollbar">
                <div className="">
                    <Tile innerClassName="text-2xl text-center font-bold">
                        <div className="flex flex-row gap-1 items-center justify-center font-bold">
                            <ChartLineIcon size={24} weight="bold" />
                            <span>Your Analytics:</span>
                        </div>
                    </Tile>
                </div>
                <div className="grid grid-rows-1 grid-cols-3 min-h-1/3 gap-5">
                    <Tile innerClassName="flex flex-col gap-1" outerClassName="col-span-2">
                        <div className="flex flex-row gap-1 items-center justify-center">
                            <CurrencyDollarIcon size={iconSize} weight="bold" />
                            <span className="text-xl font-bold">Tips From the Last Week</span>
                        </div>
                        <Chart
                            data={[Array.from(tipChartData.values())]}
                            labels={Array.from(tipChartData.keys())}
                        />
                    </Tile>
                    <Tile outerClassName="col-span-1">
                        <Stack width="100%" height="100%">
                            <div className="flex flex-row gap-1 items-center justify-center font-bold text-xl">
                                <PiggyBankIcon size={iconSize} weight="bold" />
                                <span>Your Saving Goal</span>
                            </div>
                            <GoalGauge />
                            <span className="w-full text-center mt-2">{totalTips}/100€</span>
                        </Stack>
                    </Tile>
                </div>
                <div className="min-h-1/3 grid grid-rows-1 grid-cols-3 gap-5">
                    <Tile
                        outerClassName="col-span-1"
                        innerClassName="flex flex-col justify-between items-center text-lg p-6"
                    >
                        <div className="flex flex-row items-center gap-1 text-center">
                            <StarIcon size={iconSize} weight="bold" className="text-primary" />
                            <span className="text-xl font-bold tracking-wide">Average Rating</span>
                        </div>
                        <div className="text-lg h-full w-full items-center justify-center flex flex-col gap-4">
                            <span className="text-3xl">{averageRating}</span>
                            <StyledTeamAverageRating
                                value={averageRating}
                                precision={0.05}
                                readOnly
                            />
                        </div>
                    </Tile>
                    <Tile outerClassName="col-span-2 pb-4">
                        <div className="flex flex-row gap-1 items-center justify-center mb-1">
                            <ThumbsUpIcon size={iconSize} weight="bold" />
                            <span className="text-xl font-bold">Cumulative Average Rating</span>
                        </div>
                        <LineChart
                            series={[
                                {
                                    data: mockedAverageRatings,
                                    color: '#def186',
                                },
                            ]}
                            xAxis={[
                                {
                                    data: mockedAverageRatingsTimestamps,
                                    scaleType: 'time',
                                    valueFormatter: ts => new Date(ts).toLocaleDateString(),
                                },
                            ]}
                            yAxis={[
                                {
                                    min: 0,
                                    max: 5,
                                },
                            ]}
                        />
                    </Tile>
                </div>
                <Tile innerClassName="flex flex-col gap-4 pl-12 pt-10">
                    <div className="flex flex-row gap-1 items-center justify-center font-bold text-xl mb-2">
                        <EnvelopeIcon size={iconSize} weight="bold" />
                        <span>Received Feedback:</span>
                    </div>
                    {feedback.length === 0 && (
                        <span className="text-2xl m-4">No reviews yet...</span>
                    )}
                    <div className="grid grid-cols-6 gap-5">
                        {feedback.map((item, index) => (
                            <div
                                className={`rounded-xl bg-white p-4
                                shadow-sm border-2 ${!item.rating ? 'border-action' : item.rating <= 2.5 ? 'border-red-400' : 'border-action'} flex flex-col justify-center
                                flex-none font-semibold ${getColSpan(item.feedback)} gap-2 items-center text-center`}
                                key={index}
                            >
                                {item.feedback && <span>{item.feedback}</span>}
                                {item.rating != null && item.rating >= 0 && (
                                    <StyledRating value={item.rating} precision={0.5} readOnly />
                                )}
                            </div>
                        ))}
                    </div>
                </Tile>
            </div>
        </div>
    );
}
