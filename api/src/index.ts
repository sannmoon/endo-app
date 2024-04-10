import dotenv from "dotenv";
dotenv.config(); // ⚠️ should always be written down first before putting the env variable key//

import express, { Express } from "express";
import cors from "cors";
import { routes } from "./routes";

const { PORT } = process.env;

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
