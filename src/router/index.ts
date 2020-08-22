import { Router } from "express";
import auth from "./auth";
import users from "./user";
import channel from "./channel";
import chat from "./chat";

const router = Router();
router.use("/auth", auth);
router.use("/user", users);
router.use("/channel", channel);
router.use("/chat", chat);

export default router;
