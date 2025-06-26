import express from "express";
import dotenv from "dotenv"
dotenv.config();
import { connectDB } from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
import corsMiddleware from './middlewares/corsMiddleware.js';


const app = express();
const PORT=process.env.PORT||3000

app.use(corsMiddleware);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/tasks",taskRouter);


app.listen(PORT, () => {
  connectDB();
  console.log("Server starts at http://localhost:"+PORT);
});
