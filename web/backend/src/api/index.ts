import { Router } from 'express';
import chatRoutes from "./chat.routes.js";
import tipRoutes from "./tip.routes.js";

const apiRouter = Router();

apiRouter.use('/chat', chatRoutes);
apiRouter.use('/tip', tipRoutes);

export default apiRouter;