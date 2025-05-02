import express from "express";
import {
  getClientsByIds,
  loginUser,
  registerUser,
  userInfo,
} from "../services/Client/ClientService";
import authorizeUser from "../middlewares/authorize";

const router = express.Router();

router.post("/user/register", registerUser);

router.post("/auth/login", loginUser);

router.get("/user/info", authorizeUser, userInfo);

router.get("/clients", authorizeUser, getClientsByIds);

export default router;
