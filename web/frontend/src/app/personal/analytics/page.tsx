'use client';

import { useContext } from 'react';
import Tile from '@/app/components/Tile';
import { AnalyticsContext } from '@/app/util/util';

export default function Analytics() {
    const { feedback, tips } = useContext(AnalyticsContext);

    return (
        <div className="h-screen">
            <div className="flex flex-col gap-5 overflow-y-auto h-full py-10 hide-scrollbar">
                <Tile innerClassName="flex flex-col gap-4" outerClassName="min-h-1/3">
                    <span>Tips:</span>
                    {tips.map(tip => (
                        <span key={tip.timestamp}>{tip.amount}€</span>
                    ))}
                </Tile>
                <Tile innerClassName="flex flex-col gap-4" outerClassName="min-h-1/3">
                    <span>Ratings:</span>
                    {feedback.map(feedback => {
                        const rating = feedback.rating;
                        if (rating) {
                            return <span key={feedback.timestamp}>{rating} stars</span>;
                        }
                    })}
                </Tile>
                <Tile innerClassName="flex flex-col gap-4" outerClassName="min-h-1/4">
                    <span>Feedback:</span>
                    {feedback.map(feedback => {
                        const message = feedback.feedback;
                        return <span key={feedback.timestamp}>{message ? message : ''}</span>;
                    })}
                </Tile>
                <Tile innerClassName="flex flex-col gap-4" outerClassName="min-h-1/3">
                    <span>Feedback:</span>
                    {feedback.map(feedback => {
                        const message = feedback.feedback;
                        return <span key={feedback.timestamp}>{message ? message : ''}</span>;
                    })}
                </Tile>
            </div>
        </div>
    );
}
