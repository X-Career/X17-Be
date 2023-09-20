import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CombineRouter from "./routes/index.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000 || 9000;
const MONGO_URL =
  "mongodb+srv://longvuong1920:x17hdt@x17-hdt-be.ej7xbyg.mongodb.net/travel_blog?retryWrites=true&w=majority";

app.use("/api/v1", CombineRouter);
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(error));
