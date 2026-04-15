import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const directoryName = path.resolve();

app.use("/api/v1/usuario", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comentario", commentRoute);

app.use(express.static(path.join(directoryName, "/frontend/dist")));

app.get(/^(?!\/api).+/, (_, res) => {
  res.sendFile(path.resolve(directoryName, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});
