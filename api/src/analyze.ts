import { Request, Response, Router } from "express";
import OpenAI from "openai";
import { checkAuthentication } from "./auth";
import { queryPromise } from "./db";
import { v2 as cloudinary } from "cloudinary";

const { OPEN_AI_API_KEY } = process.env;

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

export const analyzeRouter = Router();

analyzeRouter.post(
  "/analyze-image",
  checkAuthentication,
  async (req: Request, res: Response) => {
    const base64Image = req.body.image;
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
                url: base64Image,
              },
            },
          ],
        },
      ],
    });

    const user = req.currentUser;
    const analyzedResult = response.choices[0].message.content;
    const now = new Date();

    const cloudinaryResponse = await cloudinary.uploader.upload(base64Image);

    const result = await queryPromise(
      "INSERT INTO analysis (analyzed_results, image_url , user_id, created_at) VALUES (?,?,?,?)",
      [analyzedResult, cloudinaryResponse.secure_url, user.id, now]
    );
    res.send({ result: analyzedResult });
  }
);
