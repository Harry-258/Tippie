'use client';

import {useState} from "react";
import Link from "next/link";

export default function Tip() {
    const [tipAmount, setTips] = useState(0);
    const tipValues = [
        2,
        5,
        10,
    ]

    return (
        <div className="flex flex-col justify-center items-center h-screen w-full p-10 text-primary">
            <div className="flex flex-row w-full gap-4 justify-center">
                { tipValues.map((value, index) => (
                    <button key={index} disabled={value === tipAmount} onClick={() => setTips(value)}>{value}€</button>
                )) }
                <input
                    type="number"
                    min="2"
                    step="0.01"
                    placeholder="Other"
                    onChange={(value) => setTips(Number(value.target.value))}
                />
            </div>
            <Link href={'/success'}>Pay</Link>
        </div>
  )
}
