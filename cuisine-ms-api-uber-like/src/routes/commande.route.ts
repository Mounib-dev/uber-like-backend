import { Router } from "express";
import {
  saveCommande,
  retrieveCommande,
  //deleteCommande,

  //updateCommande,
} from "../api/api.commande";

const router = Router();

router.post("/save", saveCommande);

router.get("/list", retrieveCommande);

//router.put("/:id", updateCommande);

//router.delete("/:id",deleteCommande);

export default router;
