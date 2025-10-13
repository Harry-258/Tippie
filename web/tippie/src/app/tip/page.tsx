'use client';

import React, {useState} from "react";
import Link from "next/link";
import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
import Image from "next/image";

export default function Tip() {
    const [tipAmount, setTips] = useState(0);
    const tipValues = [
        2,
        5,
        10,
    ]

    return (
        <TileGrid rows={1} cols={1} className="m-10">
            <Tile innerClassName="flex flex-col justify-center items-center m-10">
                <div className="flex flex-col gap-2 mb-6">
                    <Image
                        src="/profile.svg"
                        alt="Profile Picture"
                        width={100}
                        height={100}
                    />
                    <span className="font-semibold">Jane Smith</span>
                </div>
                <span className="mb-2">Leave a tip for Jane!</span>
                <div className={"flex flex-row gap-4 justify-center"}>
                    { tipValues.map((value, index) => (
                        <button key={index} disabled={value === tipAmount} onClick={() => setTips(value)}>{value}€</button>
                    )) }
                    <input
                        type="number"
                        min="2"
                        step="0.01"
                        placeholder="Other"
                        onChange={(value) => setTips(Number(value.target.value))}
                        className="text-primary"
                    />
                </div>

                <Link href={'/tip/success'}>
                    <div className="button">Pay</div>
                </Link>
            </Tile>
        </TileGrid>
    )
}
