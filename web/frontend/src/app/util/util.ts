import { createContext } from 'react';
import { Analytics, Feedback, Tip } from '@/app/util/types';
import { getDay } from 'date-fns';

export const iconSize = 20;

export const languages = ['EN'];

export const AnalyticsContext = createContext<Analytics>({
    feedback: [],
    tips: [],
    totalTips: 0,
    averageRating: 0,
});

/**
 * Groups tips by day and calculates the total amount for each of the last 7 days.
 * @param {Array<{amount: number, timestamp: number}>} tips - Array of tip objects.
 * @returns {Map<string, number>} A Map where keys are strings with the days of the week.
 * and values are the total tip amount for that day.
 */
export function groupTipsByDay(tips: Tip[]) {
    const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(todayMidnight);
    sevenDaysAgo.setDate(todayMidnight.getDate() - 6);

    const cutoffTimestamp = sevenDaysAgo.getTime();

    const dailyTotals = new Map();

    const datePointer = new Date(sevenDaysAgo);
    for (let i = 0; i < 7; i++) {
        const dateKey = daysOfTheWeek[getDay(datePointer)];
        dailyTotals.set(dateKey, 0);
        datePointer.setDate(datePointer.getDate() + 1);
    }

    for (const tip of tips) {
        if (tip.timestamp >= cutoffTimestamp) {
            const tipDate = new Date(tip.timestamp);
            const dateKey = daysOfTheWeek[getDay(tipDate)];
            const currentTotal = dailyTotals.get(dateKey) || 0;

            dailyTotals.set(dateKey, currentTotal + tip.amount);
        }
    }

    return dailyTotals;
}

/**
 * Calculates the average rating from an array of {@Link Feedback} objects.
 * @param feedback The array used to calculate the average.
 */
export function calculateRatingAverage(feedback: Feedback[]): string {
    let ratingsTotal = 0;
    let ratingsNumber = 0;

    for (const data of feedback) {
        if (data.rating) {
            ratingsTotal += data.rating;
            ratingsNumber += 1;
        }
    }

    if (ratingsNumber === 0) {
        return '';
    }

    return (ratingsTotal / ratingsNumber).toFixed(2);
}

/**
 * Calculates the total amount of tips from the provided array.
 * @param tips The array containing the tips
 * @returns A number representing the sum of the tips
 */
export function calculateTipTotal(tips: Tip[]): number {
    return Number(
        tips
            .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)
            .toFixed(2)
    );
}
