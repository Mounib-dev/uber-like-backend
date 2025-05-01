import { Router } from "express";
import {
  createCommande,
  retrieveCommande,
  updateCommandeStatus,
  //deleteCommande,
} from "../services/Commande/CommandeService";
import authorizeUser from "../middlewares/authorize";

const router = Router();

router.post("/create", authorizeUser, createCommande);

router.get("/list", authorizeUser, retrieveCommande);

router.patch("/update", authorizeUser, updateCommandeStatus);

//router.delete("/:id",deleteCommande);

export default router;
