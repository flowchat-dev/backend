import { Router } from "express";
import getUsersInfoByChannelId from "../../controller/user/getUsersInfoByChannelId";
import getUserInfoByUserId from "../../controller/user/getUserInfoByUserId";
import me from "../../controller/user/me";

const router = Router();

router.get("/getUsersInfoByChannelId", getUsersInfoByChannelId);
router.get("/me", me);
router.get("/:userId", getUserInfoByUserId);

export default router;
