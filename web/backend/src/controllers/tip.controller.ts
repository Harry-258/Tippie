import { Request, Response } from 'express';
import {addFeedback, addTip, getFeedbackAndRatings, getUserTips} from "../services/tip.services.js";

export async function tipUser(req: Request, res: Response) {
    try {
        const { amount, uid } = req.body;

        if (!uid) {
            return res.status(400).send('Bad Request: "uid" is required');
        }
        if (!amount) {
            return res.status(400).send('Bad Request: "amount" is required');
        }

        await addTip(uid, amount);

        return res.status(200).send("OK");
    } catch (error) {
        console.error("Error tipping user: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}

export async function getAllUserTips(req: Request, res: Response) {
    try {
        const uid = req.user!.uid;

        const tips = await getUserTips(uid);

        return res.status(200).json(tips);
    } catch (error) {
        console.error("Error getting user tips: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}

export async function getAllFeedbackAndRatings(req: Request, res: Response) {
    try {
        const uid = req.user!.uid;
        
        const feedbackAndRatings = await getFeedbackAndRatings(uid);
        
        return res.status(200).json(feedbackAndRatings);
    } catch (error) {
        console.error("Error getting feedback in controller: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}

export async function leaveFeedback(req: Request, res: Response) {
    try {
        const { feedback, rating, uid } = req.body;

        if (!uid) {
            return res.status(400).send('Bad Request: "uid" is required');
        }
        if (!feedback && !rating) {
            return res.status(400).send('Bad Request: requires at least one of: "feedback", "rating"');
        }

        await addFeedback(uid, feedback, rating);

        return res.status(200).send("OK");
    } catch (error) {
        console.error("Error leaving feedback in controller: " + error);
        return res.status(500).send("Internal server error: " + error);
    }
}
