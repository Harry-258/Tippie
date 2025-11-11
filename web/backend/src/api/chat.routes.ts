import { Router } from 'express';
import {checkAuth} from "../middleware/auth.middleware.js";
import {giveMockResponse, handleNewChatMessage} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post('/', checkAuth, handleNewChatMessage);
// chatRouter.get('/', checkAuth, getConversations);
// chatRouter.get('/:conversationId', checkAuth, getConversationDetails);

chatRouter.post('/test', checkAuth, giveMockResponse);

export default chatRouter;