import { Router } from "express";
import {
  createCommande,
  retrieveCommande,
  deleteCommande,
  updateCommandeStatus,
} from "../api/api.commande";

const router = Router();

router.post("/create", createCommande);

router.get("/list", retrieveCommande);

router.patch("/:id", updateCommandeStatus);

router.delete("/:id",deleteCommande);

export default router;
