import { Feedback, Tip } from '@/app/util/types';

/**
 * Fetches all the tips from the backend.
 * @param token The token used to authorize the backend call.
 * @returns A promise object with an array of {@link Tip}
 */
export async function getAllTips(token: string): Promise<Tip[]> {
    try {
        const result = await fetch('http://localhost:4000/api/tip', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await result.json();
        const tips: Tip[] = [];

        for (const tip of data) {
            tips.push({
                amount: tip.amount,
                timestamp: tip.timestamp,
            });
        }

        return tips;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Fetches all the feedback from the backend.
 * @param token The token used to authorize the backend call.
 * @returns A promise object with an array of {@link Feedback}
 */
export async function getAllFeedback(token: string): Promise<Feedback[]> {
    try {
        const result = await fetch('http://localhost:4000/api/tip/feedback', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await result.json();
        const feedback: Feedback[] = [];

        for (const datapoint of data) {
            feedback.push({
                rating: datapoint.rating,
                timestamp: datapoint.timestamp,
                feedback: datapoint.feedback,
            });
        }

        return feedback;
    } catch (error) {
        console.error(error);
        return [];
    }
}
