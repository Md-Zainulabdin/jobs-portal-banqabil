import { app } from "./src/app.mjs";
import connectDB from "./src/db/index.mjs";
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 8080;

// Start Express Server
connectDB()
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`))

