import express from "express";
import {checkAuth} from "../middleware/auth.middleware.js";
import {
    getAllFeedbackAndRatings,
    getAllUserTips,
    leaveFeedback,
    tipUser
} from "../controllers/tip.controller.js";

const tipRouter = express.Router();

tipRouter.post("/", tipUser);
tipRouter.get("/", checkAuth, getAllUserTips);
tipRouter.post("/feedback", leaveFeedback);
tipRouter.get("/feedback", checkAuth, getAllFeedbackAndRatings);

export default tipRouter;