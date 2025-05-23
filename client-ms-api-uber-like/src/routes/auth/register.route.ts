import { Router } from "express";

import { createUser } from "../../api/auth/register.api";

const router = Router();

router.post("/register", createUser);

export default router;
