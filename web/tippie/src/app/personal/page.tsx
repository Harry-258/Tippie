'use client';

import {useState} from "react";
import Link from "next/link";
import {IoAnalytics, IoHome, IoSettingsOutline} from "react-icons/io5";
import {IconType} from "react-icons";
import {BiDollar} from "react-icons/bi";

type PageIcon = {
    page: string,
    icon: IconType,
}

export default function Home() {
    const [currentPage, setCurrentPage] = useState('Dashboard');

    const sidebarTopOptions: PageIcon[] = [
        { page: "Dashboard", icon: IoHome },
        { page: "Analytics", icon: IoAnalytics },
        { page: "Trading", icon: BiDollar },
        { page: "Settings", icon: IoSettingsOutline },
    ];

    return (
        <div className="flex flex-row p-10">
            <div className="bg-primary rounded-3xl h-screen flex flex-col p-6 gap-6">
                <span className="text-3xl font-bold flex flex-row gap-2 items-center pl-2">
                    Tippie
                </span>
                <div className="flex flex-col gap-2 w-full">
                    {sidebarTopOptions.map((option: PageIcon, i) => (
                        currentPage === option.page ? (
                            <div key={i} className="rounded-3xl bg-action text-primary p-2 pl-4 pr-20 w-full font-semibold flex flex-row gap-2 items-center">
                                <option.icon/>
                                <span className="text-m">
                                    {option.page}
                                </span>
                            </div>
                        ) : (
                            <div key={i} className="flex flex-row gap-2 px-4 p-2 items-center">
                                <option.icon/>
                                <Link href={`/personal/${option.page.toLowerCase()}`} className="font-semibold text-m">{option.page}</Link>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className="rounded-3xl w-full screen bg-white justify-center items-center flex ml-10">
                Content
            </div>
        </div>
    )
}