import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config(); // ⚠️ should always be written down first before putting the env variable key//

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (req: Request, res: Response) => {
  res.send("ok");
});

app.post("/signup", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.body.email, req.body.password, req.body.repeatPassword);
  res.send("ok");
});

app.post("/login", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.body.email, req.body.password);
  res.send("ok");
});

app.post("/analyze-image", async (req: Request, res: Response) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content:
          "You are a gynecologist that specialize in endometriosis. Analyze if this image (food) is healthy for endometriosis sufferers",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Does this image containing food good for endometriosis?",
          },
          {
            type: "image_url",
            image_url: {
              url: req.body.image,
            },
          },
        ],
      },
    ],
  });

  res.send({ result: response.choices[0].message.content });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
