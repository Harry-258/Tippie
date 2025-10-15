'use client';

import {Progress} from "@/app/util/types";
import ProgressBar from "@/app/components/ProgressBar";
import Link from "next/link";
import React from "react";

export default function Payment() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <ProgressBar progress={Progress.PaymentDetails}/>

            <Link href={'/tip/success'} className="mt-10">
                <div className="button">Pay</div>
            </Link>
        </div>
    )
}