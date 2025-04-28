import express from "express";

import { api } from "../api";

const router = express.Router();

router.get("/", api);

export default router;
