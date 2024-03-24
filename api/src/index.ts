import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (req: Request, res: Response) => {
  res.send("ok");
});

app.post("/analyze-image", async (req: Request, res: Response) => {
  // console.log(req.body.image);

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
  console.log(response.choices[0].message.content);

  res.send({ result: response.choices[0].message.content });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
