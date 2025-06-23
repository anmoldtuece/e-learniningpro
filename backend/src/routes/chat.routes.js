import { Router } from "express";
import { chatWithOpenRouter } from "../controllers/chat.controller.js";

const router = Router();

router.post("/", chatWithOpenRouter);

export default router; 