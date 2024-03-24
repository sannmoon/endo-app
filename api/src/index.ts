import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (req: Request, res: Response) => {
  res.send("ok");
});

app.post("/analyze-image", (req: Request, res: Response) => {
  console.log(req.body.image);
  res.send("done");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
