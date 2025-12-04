import { ArrowRightIcon, ClockIcon, LightbulbIcon, PlusCircleIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';
import { iconSize } from '@/app/util/util';

export default function ChatSuggestion() {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-lg font-bold flex flex-row gap-1 items-center ml-2">
                <LightbulbIcon size={iconSize} weight="bold" />
                Want More Expert Trading Advice?
            </span>
            <span className="ml-2">Jump back into your conversations or start a new one!</span>

            <Link
                href="/personal/advice"
                className="hover:shadow-md transition-all duration-300
                        hover:scale-[1.01] rounded-lg bg-white p-4
                        shadow-sm border-2 border-action/60 mt-5"
            >
                <div className="flex gap-3 items-center">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-action flex items-center justify-center">
                        <ClockIcon className="text-primary" size={iconSize} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-primary/70">
                            Last chat with <strong className="text-primary">Trading Coach</strong> •
                            2 days ago
                        </span>
                        <p className="mt-1 text-primary text-sm leading-snug">
                            “Remember to watch the EUR/USD resistance level this week — if it
                            breaks, you could see a short-term reversal opportunity.”
                        </p>
                    </div>
                </div>
            </Link>

            <div className="flex gap-2">
                <Link href={'/personal/advice'} className="mt-4">
                    <div className="flex">
                        <div className="button flex gap-1 items-center shadow-md">
                            <ArrowRightIcon className="text-primary" size={iconSize} />
                            Continue Conversation
                        </div>
                    </div>
                </Link>
                <Link href={'/personal/advice'} className="mt-4">
                    <div className="flex">
                        <div className="button flex gap-1 items-center shadow-md">
                            <PlusCircleIcon className="text-primary" size={iconSize} />
                            New Conversation
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
