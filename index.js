import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CombineRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1", CombineRouter);

const { PORT } = process.env || 9000;
const { MONGO_URL } = process.env;

mongoose
  .connect(process.env.MONGO_URL, {
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
