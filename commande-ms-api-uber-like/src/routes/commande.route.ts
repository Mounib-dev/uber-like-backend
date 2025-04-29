import { Router } from "express";
import {
  createCommande,
  //deleteCommande,
 // retrieveCommande,
  //updateCommande,
} from "../api/api.commande";


const router = Router();

router.post("/create", createCommande);

//router.get("/list", retrieveCommande);

//router.put("/:id", updateCommande);

//router.delete("/:id",deleteCommande);

export default router;
