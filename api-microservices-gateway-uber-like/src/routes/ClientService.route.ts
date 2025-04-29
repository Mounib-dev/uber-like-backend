import express from "express";
import {
  loginUser,
  registerUser,
  userInfo,
} from "../services/Client/ClientService";
import authorizeUser from "../middlewares/authorize";

const router = express.Router();

router.post("/user/register", registerUser);

router.post("/auth/login", loginUser);

router.get("/user/info", authorizeUser, userInfo);

export default router;
