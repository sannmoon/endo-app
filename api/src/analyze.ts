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
      model: "gpt-4-turbo",
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
    return res.send({ result: analyzedResult });
  }
);

//ANALYSIS ENDPOINT
analyzeRouter.get("/analyses", checkAuthentication, async (req, res) => {
  const user = req.currentUser;

  try {
    const result = await queryPromise(
      "SELECT * FROM analysis WHERE user_id = ?",
      [user.id]
    );

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Failed to load info" });
  }
});

// GET RESULT ANALYSIS ENDPOINT
analyzeRouter.get("/analysis/:id", checkAuthentication, async (req, res) => {
  //":" is just to indicate that id is dynamic
  const user = req.currentUser;
  const id = req.params.id;

  try {
    const result = await queryPromise(
      "SELECT * FROM analysis WHERE user_id = ? AND id = ?",
      [user.id, id]
    );

    if (result.length === 0) {
      return res.status(404).json({ msg: "No Matching Analysis Found" });
    }

    return res.status(200).json(result[0]);
  } catch (err) {
    return res.status(500).json({ error: "Failed to load info" });
  }
});

// DELETE RESULT ANALYSIS ENDPOINT
analyzeRouter.delete("/analysis/:id", checkAuthentication, async (req, res) => {
  const user = req.currentUser;
  const id = req.params.id;

  try {
    const result = await queryPromise(
      "DELETE FROM analysis WHERE user_id = ? AND id = ?",
      [user.id, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find any matching analysis" });
    }

    return res.status(200).json({ msg: "Successfully removed!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to delete the analysis" });
  }
});
