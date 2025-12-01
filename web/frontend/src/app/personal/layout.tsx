'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ActionIcon, Feedback, Tip } from '@/app/util/types';
import React, { useEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import {
    SignOutIcon,
    HouseIcon,
    ChartLineIcon,
    GearIcon,
    BookOpenIcon,
    UserIcon,
    UsersFourIcon,
} from '@phosphor-icons/react';
import { AnalyticsContext, iconSize } from '@/app/util/util';
import { useAuth } from '@/contexts/authContext';
import { getAllFeedback, getAllTips } from '@/app/util/apiCalls';
import { auth } from '@/firebase/firebaseClient';

export default function PersonalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { loggedIn, currentUser } = useAuth();
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [tips, setTips] = useState<Tip[]>([]);

    useEffect(() => {
        async function setup() {
            const user = auth.currentUser;
            if (!user) {
                console.error('User is not authenticated');
                return;
            }

            const token = await user.getIdToken();

            setTips(await getAllTips(token));
            setFeedback(await getAllFeedback(token));
        }

        if (!loggedIn) {
            redirect('/auth/login');
        } else {
            setup();
        }
    }, []);

    const path = usePathname();
    const sidebarElementClass =
        'flex flex-row gap-2 pl-4 pr-30 p-2 items-center rounded-3xl hover:bg-background';

    const sidebarTopOptions: ActionIcon[] = [
        { name: 'Dashboard', icon: HouseIcon },
        { name: 'Analytics', icon: ChartLineIcon },
        // { name: 'Trading', icon: CurrencyDollarIcon },
        { name: 'Learn', icon: BookOpenIcon },
        { name: 'Team', icon: UsersFourIcon },
        { name: 'Profile', icon: UserIcon },
        { name: 'Settings', icon: GearIcon },
    ];

    const sidebarBottomOptions: ActionIcon[] = [{ name: 'Log Out', icon: SignOutIcon }];

    return (
        <div className="flex flex-row h-screen">
            <div className="bg-white rounded-3xl h-auto p-6 flex flex-col justify-between shadow-md text-primary ml-10 my-10">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2 pl-4 items-center">
                        <span className="text-2xl font-bold flex flex-row gap-2 items-center">
                            Tippie
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        {sidebarTopOptions.map((option: ActionIcon, i) =>
                            path.toLowerCase().trim().endsWith(option.name.toLowerCase()) ? (
                                <div
                                    key={i}
                                    className="rounded-3xl bg-action text-primary p-2 pl-4 pr-30 w-full flex flex-row gap-2 items-center"
                                >
                                    <option.icon size={iconSize} />
                                    <span>{option.name}</span>
                                </div>
                            ) : (
                                <Link
                                    href={`/personal/${option.name.toLowerCase()}`}
                                    className={sidebarElementClass}
                                    key={i}
                                >
                                    <option.icon size={iconSize} />
                                    <span className="">{option.name}</span>
                                </Link>
                            )
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-4 px-4 items-center my-4">
                        <Link href="/personal/profile" className="text-lg link">
                            <Image
                                src="/profile.svg"
                                alt="Profile Picture"
                                width={60}
                                height={60}
                                className="border-3 border-solid border-action rounded-full"
                            />
                        </Link>
                        <div className="flex flex-col gap-1 items-start">
                            {currentUser && (
                                <Link
                                    href="/personal/profile"
                                    className="text-lg text-primary font-medium link"
                                >
                                    {currentUser.displayName
                                        ? currentUser.displayName
                                        : currentUser.email}
                                </Link>
                            )}
                            <span className="rounded-3xl bg-action text-primary px-2 font-medium text-sm">
                                Waiter
                            </span>
                        </div>
                    </div>
                    {sidebarBottomOptions.map((option: ActionIcon, i) => (
                        <Link
                            href={`${option.name === 'Log Out' ? `/auth/logout` : `/personal/${option.name.toLowerCase()}`}`}
                            key={i}
                            className={sidebarElementClass}
                        >
                            <option.icon size={iconSize} />
                            <span>{option.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <AnalyticsContext
                value={{
                    feedback: feedback,
                    tips: tips,
                }}
            >
                <div className="w-full h-full ml-5 mr-10">{children}</div>
            </AnalyticsContext>
        </div>
    );
}
