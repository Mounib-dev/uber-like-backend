import { Router } from "express";
import { createUser } from "../api/api.user";

const router = Router();

router.post("/save", createUser);

export default router;
