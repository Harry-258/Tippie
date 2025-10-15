'use client';

import ProgressBar from "@/app/components/ProgressBar";
import {Progress} from "@/app/util/types";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";

export default function Amount() {
    const [tipAmount, setTips] = useState(2);
    const tipValues = [
        2,
        5,
        10,
    ]

    // TODO: - Confirm with 2f precision
    //       - Dividers between sections?

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <ProgressBar progress={Progress.TipAmount}/>
            <div className="flex flex-col my-6 text-center mt-20 items-center justify-center">
                <Image
                    src="/profile.svg"
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="mb-1 rounded-full border-4 border-primary"
                />
                <span className="font-semibold text-xl">Jane Smith</span>
                <span className="rounded-3xl bg-action text-primary px-2 justify-self-center shadow-md font-medium text-sm">Waitress</span>
            </div>
            <span className="mb-2">Leave a tip for Jane!</span>
            <div className="flex flex-col gap-3 items-center justify-center">
                <div className={"flex flex-row gap-3 justify-center"}>
                    { tipValues.map((value, index) => (
                        <button
                            key={index}
                            disabled={value === tipAmount}
                            onClick={() => setTips(value)}
                            className="button button-primary shadow-md"
                        >
                            {value}€
                        </button>
                    )) }
                </div>
                <input
                    type="number"
                    min="2"
                    step="0.01"
                    placeholder="Other"
                    onChange={(value) => setTips(Number(value.target.value))}
                    className="text-foreground w-full bg-primary p-3 rounded-xl"
                />
            </div>
            <Link href={'/tip/payment'} className="mt-10">
                <div className="button">Confirm {tipAmount}€</div>
            </Link>
        </div>
    )
}