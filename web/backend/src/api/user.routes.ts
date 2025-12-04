import {Router} from "express";
import {checkAuth} from "../middleware/auth.middleware.js";
import {assignUserToTeam, createTeam, getUserInfo, newUser} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', checkAuth, getUserInfo);
userRouter.post('/team/new', checkAuth, createTeam);
userRouter.post('/team/assign', checkAuth, assignUserToTeam);
userRouter.post('/new', checkAuth, newUser);

export default userRouter;
