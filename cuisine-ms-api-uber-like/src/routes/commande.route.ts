import { Router } from "express";
import {
  saveCommande,
  retrieveCommande,
  updateCommandeStatus,
  deleteCommande,
} from "../api/api.commande";

const router = Router();

router.post("/save", saveCommande);

router.get("/list", retrieveCommande);

router.patch("/:id", updateCommandeStatus);

router.delete("/:id",deleteCommande);

export default router;
