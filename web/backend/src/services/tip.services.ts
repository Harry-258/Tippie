import {firestore} from "../config/firebase.config.js";

export const addTip = async (uid: string, amount: number) =>{

}

export const getUserTips = async (uid: string) => {

}

export const getRatings = async (uid: string) => {

}

export const getFeedback = async (uid: string) => {

}

export const addFeedback = async (uid: string, feedback?: string, rating?: number) => {
    try {
        // TODO: Check if user exists
        const feedbackRef = firestore
            .collection("users")
            .doc(uid)
            .collection("feedback");

        let feedbackItem: {feedback?: string, rating?: number} = {}

        if (feedback) {
            feedbackItem.feedback = feedback;
        }
        if (rating) {
            feedbackItem.rating = rating;
        }

        await feedbackRef.add(feedbackItem);
    } catch(error) {
        console.error("error adding feedback in services: " + error);
    }
}
