'use client';

import { Progress } from '@/app/util/types';
import ProgressBar from '@/app/components/ProgressBar';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function Payment() {
    return (
        <div className="h-full flex flex-col items-center">
            <ProgressBar progress={Progress.PaymentDetails} className="mt-10" />

            <div className="flex flex-col items-center justify-evenly h-full mt-10">
                <span>Imagine a payment portal</span>
                <Image src="/epic_unicorn.png" alt="epic unicorn" width={200} height={100} />
                <span>WOW!</span>

                <Link href={'/tip/success'} className="mt-10">
                    <div className="button">Pay</div>
                </Link>
            </div>
        </div>
    );
}
