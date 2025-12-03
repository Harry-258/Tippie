import { Feedback, Tip } from '@/app/util/types';

/**
 * Fetches all the tips from the backend.
 * @param token The token used to authorize the backend call.
 * @returns A promise object with an array of {@link Tip}
 */
export async function getAllTips(token: string): Promise<Tip[]> {
    try {
        const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/tip', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await result.json();
        const tips: Tip[] = [];

        for (const tip of data) {
            tips.push({
                amount: Number(tip.amount),
                timestamp: Number(tip.timestamp),
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
        const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/tip/feedback', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await result.json();
        const feedback: Feedback[] = [];

        for (const datapoint of data) {
            feedback.push({
                rating: Number(datapoint.rating),
                timestamp: Number(datapoint.timestamp),
                feedback: datapoint.feedback,
            });
        }

        return feedback;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// TODO: Finish this
// async function getUserInfo(token: string): Promise<UserInfo> {
//     try {
//         const result = fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/userinfo', {})
//     } catch (error) {
//         console.error(error);
//     }
// }

/**
 * Creates a new team with the given name.
 * @param token The token used to authorize the backend call.
 * @param name The name of the team to be created.
 */
async function createTeam(token: string, name: string) {
    try {
        const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/team', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                teamName: name,
            }),
        });
    } catch (error) {
        console.error('Error creating team: ' + error);
    }
}

/**
 * Adds a new user to the backend database.
 * @param token The token used to authorize the backend call and to identify the user to be added.
 */
export async function addNewUserToDatabase(token: string) {
    try {
        await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/new', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error adding new user to database: ' + error);
    }
}
