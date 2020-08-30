import { Router } from "express";
import getChat from "../../controller/chat/getChat";
import send from "../../controller/chat/send";
import { multerConfig } from "../../storage";

const router = Router();
router.get("/:channelId/", getChat);
router.post("/send", multerConfig.array("attachment"), send);

export default router;
