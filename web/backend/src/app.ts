import cors from "cors";
import express from "express";
import apiRouter from "./api/index.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", apiRouter);

export default app;