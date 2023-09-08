import express from "express";
import authController from "../controllers/auth.controller";
import validateRequest from "../middleware/validateRequest";
import verification from "../middleware/verification";

const router = express.Router();

router.post(
    `/auth/register`,
    [
        validateRequest.validateRequestBody(["nickname"]),
        // verification.checkDuplicateEmail,
    ],
    authController.register,
);

router.post(
    `/auth/login`,
    [
        validateRequest.validateRequestBody(["nickname"]),
        // verification.checkExsitingEmail,
    ],
    authController.signin,
);

export default router;
