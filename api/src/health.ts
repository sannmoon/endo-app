import { Request, Response, Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (req: Request, res: Response) => {
  res.send("The endo battle begins! 🤺🌿💛 Eat well! Exercise! Destress! ");
});
