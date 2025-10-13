'use client';

import Link from "next/link";
import {IoAnalytics, IoHome, IoSettingsOutline} from "react-icons/io5";
import {BiDollar, BiLogOut} from "react-icons/bi";
import Image from "next/image";
import {ActionIcon} from "@/app/util/types";
import React from "react";
import {usePathname} from "next/navigation";

export default function Home({ children }: Readonly<{children: React.ReactNode}>) {
    const path = usePathname();
    console.log(path);

    const sidebarTopOptions: ActionIcon[] = [
        { name: "Dashboard", icon: IoHome },
        { name: "Analytics", icon: IoAnalytics },
        { name: "Trading", icon: BiDollar },
        { name: "Settings", icon: IoSettingsOutline },
    ];

    const sidebarBottomOptions: ActionIcon[] = [
        { name: "Log Out", icon: BiLogOut },
    ]

    return (
        <div className="flex flex-row p-10 h-screen">
            <div className="bg-primary rounded-3xl h-full p-6 flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2 pl-4 items-center">
                        {/*<div className="rounded-full bg-action w-5 h-5"/>*/}
                        <span className="text-2xl font-bold flex flex-row gap-2 items-center">
                            Tippie
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        {sidebarTopOptions.map((option: ActionIcon, i) => (
                            path.toLowerCase().trim().endsWith(option.name.toLowerCase()) ? (
                                <div key={i} className="rounded-3xl bg-action text-primary p-2 pl-4 pr-30 w-full font-medium flex flex-row gap-2 items-center">
                                    <option.icon className="text-lg"/>
                                    <span>
                                        {option.name}
                                    </span>
                                </div>
                            ) : (
                                <div key={i} className="flex flex-row gap-2 pl-4 p-2 items-center pr-30">
                                    <option.icon className="text-lg"/>
                                    <Link
                                        href={`/personal/${option.name.toLowerCase()}`}
                                        className="link"
                                    >
                                        {option.name}
                                    </Link>
                                </div>
                            )
                        ))}
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
                            <Link href="/personal/profile" className="text-lg font-medium link">Jane Smith</Link>
                            <span className="rounded-3xl bg-action text-primary px-2 font-medium text-sm">Waitress</span>
                        </div>
                    </div>
                    {sidebarBottomOptions.map((option: ActionIcon, i) =>
                        <div key={i} className="flex flex-row gap-2 px-4 p-2 items-center">
                            <option.icon className="text-lg"/>
                            <Link className="link" href={`/personal/${option.name.toLowerCase()}`}>{option.name}</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-full ml-10">
                {children}
            </div>
        </div>
    )
}