import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CombineRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());
app.use("/api/v1", CombineRouter);

const { PORT } = process.env || 9000;
const { MONGO_URL, CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.get("", (_, res) => {
      res.send({
        message: "success",
      });
    });

    app.use("/api/v1", CombineRouter);

    app.listen(PORT, () =>
      console.log(`Server running on: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
