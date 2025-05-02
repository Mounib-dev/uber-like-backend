import { Router } from "express";
import { getClientsByIds } from "../api/api.clients";

const router = Router();

router.get("/clients", getClientsByIds);

export default router;
