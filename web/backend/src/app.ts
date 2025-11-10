import cors from "cors";
import express from "express";
import apiRouter from "./api/index.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api", apiRouter);

export default app;