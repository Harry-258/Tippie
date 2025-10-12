'use client';

import {useState} from "react";
import Link from "next/link";
import {IoAnalytics, IoHome, IoSettingsOutline} from "react-icons/io5";
import {IconType} from "react-icons";
import {BiDollar, BiLogOut} from "react-icons/bi";
import Image from "next/image";

type ActionIcon = {
    name: string,
    icon: IconType,
}

export default function Home() {
    const [currentPage] = useState('Dashboard'); // TODO: Remove and replace with react router?

    const sidebarTopOptions: ActionIcon[] = [
        { name: "Dashboard", icon: IoHome },
        { name: "Analytics", icon: IoAnalytics },
        { name: "Trading", icon: BiDollar },
    ];

    const sidebarBottomOptions: ActionIcon[] = [
        { name: "Settings", icon: IoSettingsOutline },
        { name: "Logout", icon: BiLogOut },
    ]

    return (
        <div className="flex flex-row p-10 h-screen">
            <div className="bg-primary rounded-3xl h-full p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2 pl-4 items-center">
                        {/*<div className="rounded-4xl bg-action w-5 h-5"/>*/}
                        <span className="text-2xl font-bold flex flex-row gap-2 items-center">
                            Tippie
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        {sidebarTopOptions.map((option: ActionIcon, i) => (
                            currentPage === option.name ? (
                                <div key={i} className="rounded-3xl bg-action text-primary p-2 pl-4 pr-30 w-full font-medium flex flex-row gap-2 items-center">
                                    <option.icon className="text-lg"/>
                                    <span className="text-m">
                                        {option.name}
                                    </span>
                                </div>
                            ) : (
                                <div key={i} className="flex flex-row gap-2 px-4 p-2 items-center">
                                    <option.icon className="text-lg"/>
                                    <Link href={`/personal/${option.name.toLowerCase()}`} className="font-medium text-m">{option.name}</Link>
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 font-medium text-m">
                    <div className="flex flex-row gap-4 px-4 items-center my-4">
                        <Image
                            src="/profile.svg"
                            alt="Profile Picture"
                            width={60}
                            height={60}
                        />
                        <div className="flex flex-col gap-1 items-start">
                            <Link href="/personal/profile" className="text-lg">Jane Smith</Link>
                            <span className="rounded-3xl bg-action text-primary px-2 font-medium text-sm">Waitress</span>
                        </div>
                    </div>
                    {sidebarBottomOptions.map((option: ActionIcon, i) =>
                        <div key={i} className="flex flex-row gap-2 px-4 p-2 items-center">
                            <option.icon className="text-lg"/>
                            <span className="text-m">{option.name}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="rounded-3xl w-full screen bg-white justify-center items-center flex ml-10">
                Content
            </div>
        </div>
    )
}