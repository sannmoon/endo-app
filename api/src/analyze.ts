import { Request, Response, Router } from "express";
import OpenAI from "openai";
import { checkAuthentication } from "./auth";

const express = require("express");

const { OPEN_AI_API_KEY } = process.env;

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

export const analyzeRouter = Router();

analyzeRouter.post(
  "/analyze-image",
  checkAuthentication,
  async (req: Request, res: Response) => {
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
  }
);
