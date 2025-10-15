'use client';

import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
import {Progress} from "@/app/util/types";
import ProgressBar from "@/app/components/ProgressBar";
import Link from "next/link";
import React from "react";

export default function Payment() {
    return (
        <TileGrid rows={1} cols={1} className="p-5 h-full">
            <Tile innerClassName="flex flex-col items-center justify-center h-full">
                <ProgressBar progress={Progress.PaymentDetails}/>

                <Link href={'/tip/success'} className="mt-10">
                    <div className="button">Pay</div>
                </Link>
            </Tile>
        </TileGrid>
    )
}