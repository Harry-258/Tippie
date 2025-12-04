import { Feedback, Tip, UserInfo } from '@/app/util/types';

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

/**
 * Fetches the user info from the backend.
 * @param token The token used to authorize the backend call.
 * @returns A promise object with the {@link UserInfo} object.
 */
export async function getUserInfo(token: string): Promise<UserInfo> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return {
            teamId: data.teamId ?? '',
            teamName: data.teamName ?? '',
            position: data.position ?? '',
            status: data.status ?? 'staff',
            refetch: async () => {},
        };
    } catch (error) {
        console.error(error);
        return { teamId: '', teamName: '', position: '', status: 'staff', refetch: async () => {} };
    }
}

/**
 * Creates a new team with the given name.
 * @param token The token used to authorize the backend call.
 * @param name The name of the team to be created.
 */
export async function createTeam(token: string, name: string) {
    try {
        const result = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/team/new', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamName: name,
            }),
        });
        const data = await result.json();

        return data.teamId;
    } catch (error) {
        console.error('Error creating team: ' + error);
    }
}

/**
 * Assigns the user to the team with the given ID.
 * @param token The token used to authorize the backend call and to identify the user to be assigned.
 * @param teamId The ID of the team to which the user will be assigned.
 */
export async function assignUserToTeam(token: string, teamId: string) {
    try {
        await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/team/assign', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamId: teamId,
            }),
        });
    } catch (error) {
        console.error('Error assigning user to team: ' + error);
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
