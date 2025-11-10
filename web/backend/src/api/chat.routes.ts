import { Router } from 'express';
import {checkAuth} from "../middleware/auth.middleware.js";
import {getConversationDetails, getConversations, handleNewChatMessage} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post('/', checkAuth, handleNewChatMessage);
chatRouter.get('/', checkAuth, getConversations);
chatRouter.get('/:conversationId', checkAuth, getConversationDetails);

export default chatRouter;