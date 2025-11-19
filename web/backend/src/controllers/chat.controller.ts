import { Request, Response } from 'express';
import {getAllConversations, getConversation, processChat} from "../services/chat.service.js";

export const giveMockResponse = async (req: Request, res: Response) => {
    res.status(200).json({ reply: { reply: 'Hello, this is a mock response from the backend.' } });
}

export const handleNewChatMessage = async (req: Request, res: Response) => {
    try {
        const uid = req.user!.uid;
        const { message } = req.body;

        if (!message) {
            return res.status(400).send('Bad Request: "message" is required.');
        }

        const aiResponse = await processChat(uid, message);

        res.status(200).json({ reply: aiResponse });
    } catch (error) {
        console.error('Error while handling new chat message in chat controller:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getUserConversations = async (req: Request, res: Response) => {
    try {
        const uid = req.user!.uid;

        const conversations = await getAllConversations(uid);

        res.status(200).json({ conversations });
    } catch  (error) {
        console.error('Error while getting conversations in chat controller:', error);
        res.status(500).send('Internal Server Error');
    }
};


export const getConversationDetails = async (req: Request, res: Response) => {
    try {
        const uid = req.user!.uid;
        const { conversationId } = req.params;

        if (!conversationId) {
            return res.status(400).send('Bad Request: Missing conversation ID');
        }

        const conversation = await getConversation(uid, conversationId);
        if (!conversation) {
            return res.status(404).send('Conversation not found or you do not have permission');
        }

        res.status(200).json({ conversation });
    } catch  (error) {
        console.error('Error while getting conversations in chat controller:', error);
        res.status(500).send('Internal Server Error');
    }
};
