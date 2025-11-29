'use client';

import { Progress } from '@/app/util/types';
import ProgressBar from '@/app/components/ProgressBar';
import Image from 'next/image';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Payment() {
    const params = useSearchParams();
    const userId = params.get('uid');
    const amount = params.get('amount');
    const router = useRouter();

    if (!userId || !amount) {
        return (
            <div className="h-full flex items-center justify-center w-full">
                Something went wrong. Please try again.
            </div>
        );
    }

    async function makePayment() {
        try {
            await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/tip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    uid: userId,
                }),
            });
            router.push('/tip/success?uid=' + userId);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-full flex flex-col items-center">
            <ProgressBar progress={Progress.PaymentDetails} className="mt-10" />

            <div className="flex flex-col items-center justify-evenly h-full mt-10">
                <span>Imagine a payment portal</span>
                <Image src="/epic_unicorn.png" alt="epic unicorn" width={200} height={100} />
                <span>WOW!</span>

                <button onClick={makePayment} className="mt-10">
                    <div className="button">Pay</div>
                </button>
            </div>
        </div>
    );
}
