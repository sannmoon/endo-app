import dotenv from "dotenv";
dotenv.config(); // ⚠️ should always be written down first before putting the env variable key//

import express, { Express } from "express";
import cors from "cors";
import { routes } from "./routes";
import { v2 as cloudinary } from "cloudinary";

const { PORT, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_PASSWORD } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_PASSWORD,
});

const app: Express = express();
const port = PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// routes
app.use("/", routes);

// start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
