'use client';

import Link from "next/link";

import Image from "next/image";
import {ActionIcon} from "@/app/util/types";
import React from "react";
import {usePathname} from "next/navigation";
import {SignOutIcon, HouseIcon, ChartLineIcon, CurrencyDollarIcon, ChatCircleDotsIcon, GearIcon} from "@phosphor-icons/react";

export default function Home({ children }: Readonly<{children: React.ReactNode}>) {
    const path = usePathname();
    const iconSize = 20;

    const sidebarTopOptions: ActionIcon[] = [
        { name: "Dashboard", icon: HouseIcon },
        { name: "Analytics", icon: ChartLineIcon },
        { name: "Trading", icon: CurrencyDollarIcon },
        { name: "Advice", icon: ChatCircleDotsIcon },
        { name: "Settings", icon: GearIcon },
    ];

    const sidebarBottomOptions: ActionIcon[] = [
        { name: "Log Out", icon: SignOutIcon },
    ]

    // TODO: - Make sidebar buttons, not just clickable text
    //       - Make sidebar overflow-auto without having the icons disappear

    return (
        <div className="flex flex-row p-10 h-screen">
            <div className="bg-white rounded-3xl h-full p-6 flex flex-col justify-between shadow-md text-primary">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2 pl-4 items-center">
                        <span className="text-2xl font-bold flex flex-row gap-2 items-center">
                            Tippie
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        {sidebarTopOptions.map((option: ActionIcon, i) => (
                            path.toLowerCase().trim().endsWith(option.name.toLowerCase()) ? (
                                <div key={i} className="rounded-3xl bg-action text-primary p-2 pl-4 pr-30 w-full flex flex-row gap-2 items-center font-semibold">
                                    <option.icon size={iconSize}/>
                                    <span>
                                        {option.name}
                                    </span>
                                </div>
                            ) : (
                                <div key={i} className="flex flex-row gap-2 pl-4 p-2 items-center pr-30">
                                    <option.icon size={iconSize}/>
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
                            <Link href="/personal/profile" className="text-lg text-primary font-medium link">Jane Smith</Link>
                            <span className="rounded-3xl bg-action text-primary px-2 font-medium text-sm">Waitress</span>
                        </div>
                    </div>
                    {sidebarBottomOptions.map((option: ActionIcon, i) =>
                        <div key={i} className="flex flex-row gap-2 px-4 p-2 items-center">
                            <option.icon size={iconSize}/>
                            <Link className="link" href={`/personal/${option.name.toLowerCase()}`}>{option.name}</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-full ml-5">
                {children}
            </div>
        </div>
    )
}