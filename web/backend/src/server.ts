import app from "./app.js";
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server is listening on port ${PORT}`);
});