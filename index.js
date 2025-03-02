import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";  // Ensure this matches your file path
// index.js
import { verifyToken } from "./middleware/auth.js"; // Ensure correct path



/* configurations */
const __filename = fileURLToPath(import.meta.url); // Fixed the typo here
const __dirname = path.dirname(__filename); 
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // Corrected path to '/assets'

/* file storage */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* routes with file handling */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* mongoose setup */
const PORT = process.env.PORT || 3006;

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
