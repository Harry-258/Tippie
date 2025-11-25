'use client';

import ProgressBar from '@/app/components/ProgressBar';
import { Progress } from '@/app/util/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Amount() {
    const [tipAmount, setTips] = useState(2);
    const tipValues = [2, 5, 10];
    const params = useSearchParams();
    const userId = params.get('uid');

    if (!userId) {
        return (
            <div className="h-full flex items-center justify-center w-full">
                Oops! Looks like we could not find the user you were looking for.
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col items-center">
            <ProgressBar progress={Progress.TipAmount} className="mt-10" />
            <div className="flex flex-col items-center justify-evenly h-full">
                <div className="flex flex-col text-center items-center justify-center">
                    <Image
                        src="/profile.svg"
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="mb-1 rounded-full border-4 border-primary"
                    />
                    <span className="font-semibold text-xl">Jane Smith</span>
                    <span className="rounded-3xl bg-action text-primary px-2 justify-self-center shadow-md font-medium text-sm">
                        Waitress
                    </span>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <span>Leave a tip for Jane!</span>
                    <div className={'flex flex-row gap-3 justify-center'}>
                        {tipValues.map((value, index) => (
                            <button
                                key={index}
                                disabled={value === tipAmount}
                                onClick={() => setTips(value)}
                                className="button button-primary shadow-md"
                            >
                                {value}€
                            </button>
                        ))}
                    </div>
                    <input
                        type="number"
                        min="2"
                        step="0.01"
                        placeholder="Other"
                        onChange={value => setTips(Number(value.target.value))}
                        className="text-foreground w-full bg-primary p-3 rounded-xl"
                    />
                </div>
                <Link
                    href={{
                        pathname: '/tip/payment',
                        query: { uid: userId, amount: tipAmount },
                    }}
                >
                    <div className="button">Confirm {tipAmount}€</div>
                </Link>
            </div>
        </div>
    );
}
