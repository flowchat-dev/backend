import { Router } from "express";
import requestVerification from "../../controller/auth/requestVerification";
import loginWithVerifyCode from "../../controller/auth/loginWithVerifyCode";
import login from "../../controller/auth/login";

const router = Router();

router.post("/requestVerification", requestVerification);
router.post("/loginWithVerifyCode", loginWithVerifyCode);
router.post("/login", login);

export default router;
