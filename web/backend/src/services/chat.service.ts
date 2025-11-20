import {firestore, FieldValue} from "../config/firebase.config.js";
import {Content, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";
import {ChatMessage, Document} from "../util/types.js";

export async function getConversation(uid: string, conversationId: string) {
    try {
        let result: ChatMessage[] = [];

        const conversationRef = await firestore.collection('users')
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
    }
}

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

        // 1. Get or Create Conversation Reference
        let convoRef: FirebaseFirestore.DocumentReference;

        if (conversationId) {
            convoRef = firestore.collection('users').doc(uid).collection('conversations').doc(conversationId);
        } else {
            // Create a new conversation
            convoRef = firestore.collection('users').doc(uid).collection('conversations').doc();
            await convoRef.set({
                title: userMessage.substring(0, 40) + "...", // Set an initial title
                createdAt: new Date(),
            });
        }

        const messagesRef = convoRef.collection('messages');

        // 2. Fetch Chat History from Firestore
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

        // 3. Call the Gemini API
        const chat = model.startChat({
            // history: [],
            safetySettings,
        });

        const result = await chat.sendMessage(userMessage);
        const aiResponseText = result.response.text();
        const timestamp = Date.now();

        // 4. Save new messages to Firestore
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

        // Use Promise.all to write both new messages concurrently
        await Promise.all([
            messagesRef.add(newUserMessage),
            messagesRef.add(newAiMessage),
        ]);

        // 5. Return the AI's response and the conversation ID
        return {
            reply: aiResponseText,
            conversationId: convoRef.id,
            timestamp: timestamp,
        };

    } catch (error) {
        console.error("Error processing chat:", error);
        throw new Error("Failed to get response from AI");
    }
};
