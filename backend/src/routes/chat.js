// import express from "express";
// import { auth } from "../middleware/auth.js";
// import { createChat, sendMessage } from "../controllers/chatController.js";

// const router = express.Router();

// router.post("/create", auth, createChat);
// router.post("/:chatId/message", auth, sendMessage);

// export default router;


import express from "express";
import { auth } from "../middleware/auth.js";
import { createChat, sendMessage, getChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/create", auth, createChat);
router.get("/:chatId", auth, getChat);      // <-- ADD THIS
router.post("/:chatId/message", auth, sendMessage);

export default router;
