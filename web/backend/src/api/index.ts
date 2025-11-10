import { Router } from 'express';
import chatRoutes from "./chat.routes.js";

const apiRouter = Router();

apiRouter.use('/chat', chatRoutes);

export default apiRouter;