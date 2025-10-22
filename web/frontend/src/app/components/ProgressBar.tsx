import React from 'react';
import { Progress, ProgressBarProps } from '@/app/util/types';
import { CheckCircleIcon, CreditCardIcon, CurrencyDollarIcon } from '@phosphor-icons/react';

export default function ProgressBar({ progress, className }: ProgressBarProps) {
    const iconClass = 'absolute top-[25px] -translate-x-1/2 -translate-y-1/2';
    const iconSize = 25;

    return (
        <div className={`relative w-[240px] h-[30px] ${className}`}>
            <svg
                width="240"
                height="50"
                viewBox="0 0 240 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="35"
                    y="17.5"
                    width="70"
                    height="15"
                    fill={progress === Progress.TipAmount ? '#D9D9D9' : '#1F1E30'}
                />
                <rect
                    x="135"
                    y="17.5"
                    width="70"
                    height="15"
                    fill={progress === Progress.FeedbackForm ? '#1F1E30' : '#D9D9D9'}
                />
                <circle cx="25" cy="25" r="20" fill="#1F1E30" />
                <circle
                    cx="120"
                    cy="25"
                    r="20"
                    fill={progress === Progress.TipAmount ? '#D9D9D9' : '#1F1E30'}
                />
                <circle
                    cx="215"
                    cy="25"
                    r="20"
                    fill={progress === Progress.FeedbackForm ? '#1F1E30' : '#D9D9D9'}
                />
            </svg>

            <div className={`left-[25px] ${iconClass}`}>
                <CurrencyDollarIcon className="text-foreground" size={iconSize} />
            </div>
            <div className={`left-[120px] ${iconClass}`}>
                <CreditCardIcon
                    className={progress === Progress.TipAmount ? 'text-primary' : 'text-foreground'}
                    size={iconSize}
                />
            </div>
            <div className={`left-[215px] ${iconClass}`}>
                <CheckCircleIcon
                    className={
                        progress === Progress.FeedbackForm ? 'text-foreground' : 'text-primary'
                    }
                    size={iconSize}
                />
            </div>
        </div>
    );
}
