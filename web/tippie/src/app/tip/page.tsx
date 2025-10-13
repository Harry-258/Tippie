'use client';

import React, {useState} from "react";
import Link from "next/link";
import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
import Image from "next/image";

export default function Tip() {
    const [tipAmount, setTips] = useState(2);
    const tipValues = [
        2,
        5,
        10,
    ]

    return (
        <TileGrid rows={1} cols={1} className="p-10">
            <Tile innerClassName="flex flex-col">
                <div className="w-full flex flex-row justify-end">
                    <div className="bg-primary text-foreground rounded-lg p-2">
                        Lang
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col gap-1 my-6 text-center">
                        <Image
                            src="/profile.svg"
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="mb-2"
                        />
                        <span className="font-semibold">Jane Smith</span>
                        <span className="rounded-3xl bg-action text-primary mx-2 justify-self-center shadow font-medium text-sm">Waitress</span>
                    </div>
                    <span className="mb-2">Leave a tip for Jane!</span>
                    <div className={"flex flex-row gap-4 justify-center"}>
                        { tipValues.map((value, index) => (
                            <button key={index} disabled={value === tipAmount} onClick={() => setTips(value)}>{value}€</button>
                        )) }
                    </div>
                    <input
                        type="number"
                        min="2"
                        step="0.01"
                        placeholder="Other"
                        onChange={(value) => setTips(Number(value.target.value))}
                        className="text-primary"
                        id="tip_input_other"
                    />
                    <Link href={'/tip/success'} className="mt-10">
                        <div className="button">Confirm {tipAmount}€</div>
                    </Link>
                </div>
            </Tile>
        </TileGrid>
    )
}
