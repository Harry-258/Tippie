import {UserInfo} from "../util/types.js";
import {firestore, FieldValue} from "../config/firebase.config.js";

/**
 * Gets the user information from the database.
 * @param uid The ID of the user whose information is to be retrieved.
 * @returns A promise object containing the user information as a {@link UserInfo} object or void if an error occurs.
 */
export async function getUser(uid: string) {
    try {
        const userRef = firestore.collection('users').doc(uid);
        const userDoc = await userRef.get();

        return {
            teamId: userDoc.data()?.teamId ?? "",
            teamName: userDoc.data()?.teamName ?? "",
            position: userDoc.data()?.position ?? "",
            status: userDoc.data()?.status ?? "staff",
        } as UserInfo
    } catch (error) {
        console.error("Error getting user info in services: " + error);
    }
}

/**
 * Assigns the given user to the given team.
 * @param uid The ID of the user to be assigned to the team.
 * @param teamId The ID of the team to which the user will be assigned.
 */
export async function assignUserTeam(uid: string, teamId: string) {
    try {
        const teamsRef = firestore.collection('teams').doc(teamId);
        await teamsRef.update({
            members: FieldValue.arrayUnion(uid)
        });
        const teamName = await teamsRef.get().then(doc => doc.data()?.teamName);

        const userRef = firestore.collection('users').doc(uid);
        userRef.set({
            teamId: teamsRef.id,
            teamName: teamName,
            status: 'staff'
        });

        return teamName;
    } catch (error) {
        console.error("Error getting user info in services: " + error);
    }
}

/**
 * Creates a new team with the given name and assigns it to the user.
 * @param uid The ID of the user creating the team.
 * @param teamName The name of the team to be created.
 * @returns The ID of the newly created team.
 */
export async function createNewTeam(uid: string, teamName: string): Promise<string> {
    try {
        const teamsRef = firestore.collection('teams').doc();
        await teamsRef.set({
            teamName: teamName,
            members: [uid],
            owner: uid
        })

        const userRef = firestore.collection('users').doc(uid);
        await userRef.set({
            teamId: teamsRef.id,
            teamName: teamName,
            status: 'owner'
        });

        return teamsRef.id;
    } catch (error) {
        console.error("Error creating a team in services: " + error);
        return '';
    }
}

/**
 * Adds a new user to the database.
 * @param uid The ID of the new user.
 */
export async function addNewUserToDatabase(uid: string) {
    try {
        const userRef = firestore.collection('users').doc(uid);
        const status = await userRef.get().then(doc => doc.data()?.status);

        await userRef.set({ status: status ? status : 'staff' }, { merge: true });
    } catch (error) {
        console.error("Error adding a new user in services: " + error);
    }
}
