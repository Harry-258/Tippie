import {Router} from "express";
import {checkAuth} from "../middleware/auth.middleware.js";
import {assignUserToTeam, getUserInfo, getUserTeam} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', checkAuth, getUserInfo);
userRouter.post('/team', checkAuth, assignUserToTeam);
userRouter.get('/team', checkAuth, getUserTeam);

export default userRouter;
