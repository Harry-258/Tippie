import {Request, Response} from "express";
import {addNewUserToDatabase, assignUserTeam, createNewTeam, getUser} from "../services/user.service.js";

/**
 * Handles the request to get the user's info.
 * @param req the request object containing the user ID.
 * @param res the response object.
 */
export async function getUserInfo(req: Request, res: Response) {
    try {
        const uid = req.user!.uid;

        const userInfo = await getUser(uid);

        if (!userInfo) {
            return res.status(404).send('User info not found');
        }

        return res.status(200).json(userInfo);
    } catch (error) {
        console.error("Error getting user info in controller: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}

/**
 * Handles the request to assign a user to a team.
 * @param req the request object containing the team ID.
 * @param res the response object.
 */
export async function assignUserToTeam(req: Request, res: Response) {
    try {
        const uid = req.user!.uid;
        const { teamId } = req.body;

        if (!teamId) {
            return res.status(400).send('Bad Request: Missing team ID');
        }

        const teamName = await assignUserTeam(uid, teamId);

        return res.status(200).json({
            teamId: teamId,
            teamName: teamName,
        });
    } catch (error) {
        console.error("Error assigning user to team in controller: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}

/**
 * Handles the request to create a new team.
 * @param req the request object containing the team name.
 * @param res the response object.
 */
export async function createTeam(req: Request, res: Response) {
    try {
        const uid = req.user!.uid;
        const { teamName } = req.body;

        if (!teamName) {
            return res.status(400).send('Bad Request: Missing team name');
        }

        const teamID = await createNewTeam(uid, teamName);

        return res.status(200).json({
            teamId: teamID,
            teamName: teamName,
        });
    } catch (error) {
        console.error("Error creating team in controller: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}

/**
 * Handles the request to add a new user to the database.
 * @param req the request object containing the user ID.
 * @param res the response object.
 */
export async function newUser(req: Request, res: Response) {
    try {
        const uid = req.user!.uid;

        await addNewUserToDatabase(uid);

        return res.status(200).send("OK");
    } catch (error) {
        console.error("Error adding new user to database in controller: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}