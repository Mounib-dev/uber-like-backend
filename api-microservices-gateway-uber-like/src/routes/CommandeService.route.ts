import { Router } from "express";
import {
  createCommande,
  retrieveCommande
  //deleteCommande,

  //updateCommande,
} from '../services/Commande/CommandeService';
import authorizeUser from "../middlewares/authorize";


const router = Router();

router.post("/create",authorizeUser, createCommande);

router.get("/list", authorizeUser, retrieveCommande);

//router.put("/:id", updateCommande);

//router.delete("/:id",deleteCommande);

export default router;
