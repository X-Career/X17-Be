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
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        [
          "http://localhost:3000",
          "https://x17-project-hdt.vercel.app",
        ].includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error(`${origin} not allowed by our CORS Policy.`));
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

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
    console.log("DB Connection Successful");
  })
  .catch((error) => console.log(error));

app.get("/", (_, res) => {
  res.send({
    message: "success",
  });
});

app.use("/api/v1", CombineRouter);

app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
