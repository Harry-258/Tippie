'use client';

import {useState} from "react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";

export default function Home() {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const sidebarTopOptions: string[] = [
        'Dashboard',
        'Analytics',
        'Trading',
        'Settings',
    ]

    // TODO: Setup colors with tailwind (primary, accent, etc.)
    return (
        <div className="flex flex-row">
            <div className="bg-[#1F1E30] m-10 rounded-xl h-screen flex flex-col p-6 gap-6">
                <span className="text-3xl font-bold flex flex-row gap-2 items-center">
                    <IoSettingsOutline />
                    Tippie
                </span>
                <div className="flex flex-col gap-2 w-full">
                    {sidebarTopOptions.map((option: string, i) => (
                        currentPage === option ? (
                            <div key={i} className="rounded-3xl bg-[#DEF186] text-[#1F1E30] p-2 px-4 w-full font-semibold flex flex-row gap-2 items-center">
                                <IoSettingsOutline/>
                                <span className="text-m">
                                    {option}
                                </span>
                            </div>
                        ) : (
                            <div key={i} className="flex flex-row gap-2 px-4 p-2 items-center">
                                <IoSettingsOutline />
                                <Link href={`/personal/${option.toLowerCase()}`} className="font-semibold text-m">{option}</Link>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div>
                Content
            </div>
        </div>
    )
}