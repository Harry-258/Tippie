'use client';

import Link from 'next/link';
import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import Stack from '@mui/material/Stack';
import GoalGauge from '@/app/components/GoalGauge';
import TipsLastWeekChart from '@/app/components/TipsLastWeekChart';
import {
    ChartBarIcon,
    PiggyBankIcon,
    ArrowUpRightIcon,
    StarIcon,
    ThumbsUpIcon,
    ClockUserIcon,
    MegaphoneIcon,
} from '@phosphor-icons/react';
import React, { useContext, useEffect, useState } from 'react';
import ChatSuggestion from '@/app/components/ChatSuggestion';
import { AnalyticsContext, iconSize } from '@/app/util/util';
import { useAuth } from '@/contexts/authContext';
import { Feedback } from '@/app/util/types';
import { StyledAverageRating, StyledRating } from '@/app/components/StarRating';

export default function Dashboard() {
    // TODO: make sidebar collapsible?

    const { currentUser } = useAuth();
    const [displayedFeedback, setDisplayedFeedback] = useState<Feedback[]>([]);
    const { feedback, totalTips, averageRating } = useContext(AnalyticsContext);

    useEffect(() => {
        setDisplayedFeedback(
            feedback
                .filter(review => review.rating && review.feedback)
                .filter((value, index) => index < 4)
        );
    }, [feedback]);

    return (
        <TileGrid rows={6} cols={10}>
            <Tile
                innerClassName="flex flex-col items-center gap-4 justify-center ml-2"
                outerClassName="col-span-full"
            >
                <span className="text-2xl font-bold">
                    Welcome, {currentUser.displayName ? currentUser.displayName : currentUser.email}
                    !
                </span>
                <span className="text-lg">Balance: {totalTips}€</span>
            </Tile>

            <Tile
                outerClassName="col-span-4 row-span-2"
                innerClassName="flex flex-col justify-center items-center font-bold"
                redirectPage="Analytics"
            >
                <Stack width="95%" height="95%">
                    <div className="flex flex-row gap-1 items-center justify-center font-bold text-lg">
                        <ChartBarIcon size={iconSize} weight="bold" />
                        <span>Tips Received Over the Last Week</span>
                    </div>
                    <TipsLastWeekChart />
                </Stack>
            </Tile>

            <Tile
                outerClassName="col-span-2 row-span-1"
                innerClassName="flex flex-col justify-between items-center text-lg p-6"
                redirectPage="Team"
            >
                <div className="flex flex-row items-center gap-2 text-center">
                    <ClockUserIcon size={iconSize} weight="bold" className="text-primary" />
                    <span className="text-lg font-bold tracking-wide">Your Next Shift</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="font-semibold">Saturday</span>
                    <span>05.12.2025</span>
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
                redirectPage="Team"
            >
                <div className="flex flex-row items-center gap-2 text-center">
                    <MegaphoneIcon size={iconSize} weight="bold" className="text-primary" />
                    <span className="text-lg font-bold tracking-wide">Announcements</span>
                </div>

                <div className="flex flex-row items-center justify-center h-full w-full text-lg mt-2">
                    <span>Nothing new...</span>
                    {/*<ArrowUpRightIcon size={28} className="text-action" weight="bold" />*/}
                </div>
            </Tile>

            <Tile outerClassName="col-span-5 row-span-2">
                <ChatSuggestion />
            </Tile>
            <Tile
                outerClassName="col-span-5 row-span-2"
                innerClassName="flex flex-col justify-between items-center text-lg p-6"
                redirectPage="Analytics"
            >
                <div className="flex flex-row items-center gap-2 text-center">
                    <StarIcon size={iconSize} weight="bold" className="text-primary" />
                    <span className="text-lg font-bold tracking-wide">Average Rating</span>
                </div>
                <div className="text-lg h-full w-full items-center justify-center flex flex-col gap-4">
                    <span className="text-3xl">{averageRating}</span>
                    <StyledAverageRating value={averageRating} precision={0.05} readOnly />
                </div>
            </Tile>

            <Tile
                outerClassName="col-span-full"
                innerClassName="flex flex-row gap-6 justify-center"
            >
                {feedback.length === 0 && (
                    <span className="text-2xl h-full flex items-center">No reviews yet...</span>
                )}
                {feedback.length !== 0 && (
                    <div className="flex flex-col text-lg items-center justify-center min-w-1/5">
                        <div className="flex flex-row gap-2 items-center font-bold">
                            <ThumbsUpIcon size={iconSize} weight="bold" className="text-primary" />
                            <span>Most Recent Reviews:</span>
                        </div>
                        <span className="mt-2">Very positive</span>
                    </div>
                )}
                {displayedFeedback.map((item, index) => (
                    <Link
                        className="hover:shadow-md transition-all duration-300
                            hover:scale-[1.01] rounded-xl bg-white p-3 gap-2 text-center
                            shadow-sm border-2 border-action flex flex-col justify-center
                            items-center flex-none font-semibold max-w-1/6 min-w-1/6"
                        key={index}
                        href="/personal/analytics"
                    >
                        <span className="line-clamp-2">{item.feedback}</span>
                        <StyledRating value={item.rating} precision={0.5} readOnly />
                    </Link>
                ))}
            </Tile>
        </TileGrid>
    );
}
