'use client';

import Tile from '@/app/components/Tile';
import { iconSize } from '@/app/util/util';
import React, { useEffect, useState } from 'react';
import { UsersFourIcon, CopyIcon, StarIcon, CalendarIcon } from '@phosphor-icons/react';
import { useUserContext } from '@/contexts/userContext';
import Chart from '@/app/components/Chart';
import ChooseTeamCards from '@/app/components/ChooseTeamCards';
import { StyledTeamAverageRating } from '@/app/components/StarRating';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';

export default function Team() {
    const { teamName, teamId, status } = useUserContext();
    const [currentTeamName, setCurrentTeamName] = useState<string>(teamName);
    const [currentTeamId, setCurrentTeamId] = useState<string>(teamId);
    const defaultClassNames = getDefaultClassNames();
    const selectedDates = [new Date(2025, 11, 12)];

    for (let i = 1; i <= 16; i++) {
        if (i % 7 === 0 || i % 7 === 6 || i === 4 || i === 5) continue;
        selectedDates.push(new Date(2025, 11, i));
    }

    useEffect(() => {
        setCurrentTeamName(teamName);
        setCurrentTeamId(teamId);
    }, [teamName, teamId]);

    if (currentTeamId && currentTeamName) {
        return (
            <div className="h-screen">
                <div className="flex flex-col gap-5 overflow-y-auto h-full py-10 hide-scrollbar">
                    <Tile
                        innerClassName="flex flex-col gap-6 py-8 px-10 justify-center"
                        outerClassName="min-h-1/5 max-h-1/5"
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <UsersFourIcon size={iconSize * 2} />
                            <span className="text-3xl font-bold">Team {currentTeamName}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div
                                className="hover:cursor-pointer rounded-xl flex flex-row gap-2 items-center w-1/2 font-semibold text-lg"
                                onClick={() => {
                                    navigator.clipboard.writeText(currentTeamId);
                                }}
                            >
                                <span>Team ID: {teamId}</span>
                                <CopyIcon size={iconSize} weight="bold" />
                            </div>
                        </div>
                    </Tile>
                    <div className="flex flex-row gap-5 max-h-1/3 min-h-1/3">
                        <Tile innerClassName="flex flex-col gap-2 p-4 h-full">
                            <span className="text-xl font-semibold text-center">
                                Team {teamName} total tips from last week
                            </span>
                            <Chart
                                data={[[112, 97, 105, 100.5, 125, 114, 109]]}
                                labels={['Tips']}
                            />
                        </Tile>

                        <Tile innerClassName="flex flex-col gap-2 p-4 h-full">
                            <span className="text-xl font-semibold text-center">
                                Team {teamName} average tips from last week
                            </span>
                            <Chart
                                data={[
                                    [33.2, 35.6, 30.2, 30.1, 35.4, 38.2, 31.8],
                                    [34, 37, 32.5, 29.5, 36, 0, 0],
                                ]}
                                labels={['Team average', 'Your tips']}
                            />
                        </Tile>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-1 gap-5">
                        <Tile
                            outerClassName="col-span-2"
                            innerClassName="flex flex-col gap-1 w-full"
                        >
                            <div className="flex flex-row items-center gap-2 text-center w-full justify-center">
                                <CalendarIcon
                                    size={iconSize}
                                    weight="bold"
                                    className="text-primary"
                                />
                                <span className="text-xl font-semibold tracking-wide">
                                    Your shifts
                                </span>
                            </div>

                            <div className="flex flex-row justify-evenly">
                                <DayPicker
                                    mode="multiple"
                                    selected={selectedDates}
                                    classNames={{
                                        today: `text-action`,
                                        selected: `bg-primary text-action justify-center rounded-full`,
                                        root: `${defaultClassNames.root} max-w-none m-5`,
                                        chevron: `${defaultClassNames.chevron} fill-action`,
                                    }}
                                    onSelect={() => {}}
                                    navLayout="around"
                                />

                                <div className="flex flex-col gap-8 h-full mt-7 w-1/3">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold text-lg">
                                            Upcoming shift:
                                        </span>
                                        <span>Monday, 08.12.2025</span>
                                        <span>8:00 - 16:00</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold text-lg">
                                            Next vacation day:
                                        </span>
                                        <span>Wednesday, 17.12.2025</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold text-lg">
                                            Announcements:
                                        </span>
                                        <span>Nothing new</span>
                                    </div>
                                </div>
                            </div>
                        </Tile>
                        <Tile innerClassName="flex flex-col justify-center items-center text-lg p-4">
                            <div className="flex flex-row items-center gap-2 text-center">
                                <StarIcon size={iconSize} weight="bold" className="text-primary" />
                                <span className="text-xl font-semibold tracking-wide">
                                    Team average rating
                                </span>
                            </div>

                            <div className="text-lg h-full w-full items-center justify-center flex flex-col gap-4">
                                <span className="text-3xl">4.6</span>
                                <StyledTeamAverageRating value={4.6} precision={0.05} readOnly />
                            </div>
                        </Tile>
                    </div>
                </div>
            </div>
        );
    }

    return <ChooseTeamCards />;
}
