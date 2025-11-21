import express from "express";
import {checkAuth} from "../middleware/auth.middleware.js";
import {
    getAllFeedback,
    getAllRatings,
    getAllUserTips,
    leaveFeedback,
    tipUser
} from "../controllers/tip.controller.js";

const tipRouter = express.Router();

tipRouter.post("/", checkAuth, tipUser);
tipRouter.get("/", checkAuth, getAllUserTips);
tipRouter.post("/feedback", checkAuth, leaveFeedback);
tipRouter.get("/feedback", checkAuth, getAllFeedback);
tipRouter.get("/rating", checkAuth, getAllRatings);

export default tipRouter;