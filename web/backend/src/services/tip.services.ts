import {firestore} from "../config/firebase.config.js";

export const addTip = async (uid: string, amount: number) =>{
    try {
        const tipsRef = firestore
            .collection("users")
            .doc(uid)
            .collection("tips");

        await tipsRef.add({
            amount: amount,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error("Error adding tip in services: " + error);
    }
}

export const getUserTips = async (uid: string) => {
    try {
        const result = [];
        const tipsRef = await firestore
            .collection("users")
            .doc(uid)
            .collection("tips")
            .get();

        for (const tip of tipsRef.docs) {
            const data = tip.data();
            result.push({
                amount: data.amount,
                timestamp: data.timestamp,
            })
        }

        return result;
    } catch (error) {
        console.error("Error getting user tips in services: " + error);
    }
}

export const getFeedbackAndRatings = async (uid: string) => {
    try {
        const result = [];
        const feedbackAndRatingsRef = await firestore
            .collection('users')
            .doc(uid)
            .collection('feedback')
            .get();

        if (feedbackAndRatingsRef.empty) {
            return [];
        }

        for (const feedbackAndRating of feedbackAndRatingsRef.docs) {
            const data = feedbackAndRating.data();

            const feedbackItem: {
                timestamp: number,
                feedback?: string,
                rating?: number
            } = {
                timestamp: data.timestamp,
            }
            if (data.feedback) {
                feedbackItem.feedback = data.feedback;
            }
            if (data.rating) {
                feedbackItem.rating = data.rating;
            }

            result.push(feedbackItem);
        }

        return result;
    } catch (error) {
        console.error("Error getting feedback and ratings in services: " + error);
    }
}

export const addFeedback = async (uid: string, feedback?: string, rating?: number) => {
    try {
        // TODO: Check if user exists
        const feedbackRef = firestore
            .collection("users")
            .doc(uid)
            .collection("feedback");

        let feedbackItem: {
            timestamp: number,
            feedback?: string,
            rating?: number
        } = {
            timestamp: Date.now(),
        }

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
