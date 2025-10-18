import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Express!");
});

app.get("/api/test", (req: Request, res: Response) =>
    res.json({ user: "Harry" }).status(200)
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
