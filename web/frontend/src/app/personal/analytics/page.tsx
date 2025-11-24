'use client';

import { useEffect, useState } from 'react';
import { Feedback, Tip } from '@/app/util/types';
import { getAllFeedback, getAllTips } from '@/app/util/apiCalls';
import { auth } from '@/firebase/firebaseClient';
import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';

export default function Analytics() {
    const [tips, setTips] = useState<Tip[]>([]);
    const [feedback, setFeedback] = useState<Feedback[]>([]);

    useEffect(() => {
        async function setup() {
            const user = auth.currentUser;
            if (!user) {
                console.error('User is not authenticated');
                return;
            }

            const token = await user.getIdToken();

            setTips(await getAllTips(token));
            setFeedback(await getAllFeedback(token));
        }

        setup();
    }, []);

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
