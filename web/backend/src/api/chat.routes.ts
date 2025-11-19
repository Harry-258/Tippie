import { Router } from 'express';
import {checkAuth} from "../middleware/auth.middleware.js";
import {
    getConversationDetails,
    getUserConversations,
    giveMockResponse,
    handleNewChatMessage
} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post('/', checkAuth, handleNewChatMessage);
chatRouter.get('/', checkAuth, getUserConversations);
chatRouter.get('/:conversationId', checkAuth, getConversationDetails);

chatRouter.post('/test', checkAuth, giveMockResponse);

export default chatRouter;