import {firestore} from "../config/firebase.config.js";
import {GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";
import {ChatMessage, Document} from "../util/types.js";

/**
 * Gets all the messages from the conversation with the given ID.
 * @param uid The ID of the user for which it will retrieve the messages.
 * @param conversationId The ID of the conversation that contains the messages.
 * @returns A promise object containing an array of messages.
 */
export async function getConversation(uid: string, conversationId: string) {
    try {
        let result: ChatMessage[] = [];

        const conversationRef = await firestore
            .collection('users')
            .doc(uid)
            .collection('conversations')
            .doc(conversationId)
            .collection('messages')
            .get();

        if (conversationRef.empty) {
            return [];
        }

        for (const conversation of conversationRef.docs) {
            const data = conversation.data();

            result.push({
                parts: data.parts[0].text,
                role: data.role,
                timestamp: data.timestamp,
            })
        }

        return result;
    } catch (error) {
        console.error("Error getting conversation details from database: " + error);
        return [];
    }
}

/**
 * Gets all the titles and IDs for the users conversations bundled in {@link Document} objects.
 * @param uid The ID of the user for which to retrieve the conversations.
 * @returns A promise object with an array of {@link Document} objects.
 */
export async function getAllConversations(uid: string): Promise<Document[]> {
    try {
        let result: Document[] = [];

        const conversationsRef = await firestore.collection('users')
            .doc(uid)
            .collection('conversations')
            .get();

        if (conversationsRef.empty) {
            return [];
        }

        for (const document of conversationsRef.docs) {
            const data = document.data();

            result.push({
                title: data.title,
                id: document.id,
            });
        }

        return result;
    } catch (error) {
        console.error(`Error getting all conversations: ` + error);
        return [];
    }
}

/**
 * Calls the API for the AI model and stores the sent message and the response.
 * @param uid The ID of the user.
 * @param userMessage The message the user sent.
 * @param conversationId The ID of the conversation that this message belongs to. If null, it will create a new conversation.
 * @returns A promise object containing a string with the reply from the AI, a timestamp, and the conversation ID.
 */
export const processChat = async (
    uid: string,
    userMessage: string,
    conversationId?: string
) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
        });
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        // Get or Create Conversation Reference
        let convoRef: FirebaseFirestore.DocumentReference;

        if (conversationId) {
            convoRef = firestore.collection('users').doc(uid).collection('conversations').doc(conversationId);
        } else {
            // Create a new conversation
            convoRef = firestore.collection('users').doc(uid).collection('conversations').doc();

            let title: string = userMessage.substring(0, 40);
            if (userMessage.length > 40) {
                title += "...";
            }

            await convoRef.set({
                title: title,
                createdAt: new Date(),
            });
        }

        const messagesRef = convoRef.collection('messages');

        // TODO: Use history in chat messages

        // Fetch Chat History from Firestore
        // const historySnapshot = await messagesRef.orderBy('timestamp', 'desc').limit(20).get();
        //
        // const firestoreHistory: ChatMessage[] = [];
        // historySnapshot.docs.forEach(doc => {
        //     firestoreHistory.push(doc.data() as ChatMessage);
        // });

        // Reverse to be in chronological order and map to the required format
        // const history: Content[] = firestoreHistory.reverse().map(msg => ({
        //     role: msg.role,
        //     parts: msg.text,
        // }));

        // Call the Gemini API
        const chat = model.startChat({
            // history: [],
            safetySettings,
        });

        const result = await chat.sendMessage(userMessage);
        const aiResponseText = result.response.text();
        const timestamp = Date.now();

        // Save new messages to Firestore
        const newUserMessage: ChatMessage = {
            role: "User",
            parts: [{ text: userMessage }],
            timestamp: timestamp,
        };
        const newAiMessage: ChatMessage = {
            role: "Agent",
            parts: [{ text: aiResponseText }],
            timestamp: timestamp + 1,
        };

        await Promise.all([
            messagesRef.add(newUserMessage),
            messagesRef.add(newAiMessage),
        ]);

        // Return the AI's response, the message timestamp, and the conversation ID
        return {
            reply: aiResponseText,
            conversationId: convoRef.id,
            timestamp: timestamp,
        };
    } catch (error) {
        console.error("Error processing chat:", error);
    }
};
