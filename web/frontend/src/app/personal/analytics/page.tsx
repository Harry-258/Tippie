'use client';

import { useContext } from 'react';
import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import { AnalyticsContext } from '@/app/util/util';

export default function Analytics() {
    const { feedback, tips } = useContext(AnalyticsContext);

    return (
        <TileGrid rows={3} cols={1}>
            <Tile innerClassName="flex flex-col gap-4">
                <span>Tips:</span>
                {tips.map(tip => (
                    <span key={tip.timestamp}>{tip.amount}€</span>
                ))}
            </Tile>
            <Tile innerClassName="flex flex-col gap-4">
                <span>Ratings:</span>
                {feedback.map(feedback => {
                    const rating = feedback.rating;
                    if (rating) {
                        return <span key={feedback.timestamp}>{rating} stars</span>;
                    }
                })}
            </Tile>
            <Tile innerClassName="flex flex-col gap-4">
                <span>Ratings:</span>
                {feedback.map(feedback => {
                    const message = feedback.feedback;
                    return <span key={feedback.timestamp}>{message ? message : ''}</span>;
                })}
            </Tile>
        </TileGrid>
    );
}
