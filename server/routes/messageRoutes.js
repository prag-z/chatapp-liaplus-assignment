import { addMessage, getMessages } from "../controllers/messageController.js";
import express from "express";
const router = express.Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

export default router;
