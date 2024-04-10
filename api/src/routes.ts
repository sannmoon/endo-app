import express from "express";
import { authRouter } from "./auth";
import { analyzeRouter } from "./analyze";
import { healthRouter } from "./health";

export const routes = express.Router();

routes.use(authRouter);
routes.use(analyzeRouter);
routes.use(healthRouter);
