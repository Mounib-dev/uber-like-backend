import { Router } from "express";
import {
    retrieveLivraison
  //deleteLivraison,
 
  //updateLivraison,
} from "../api/api.livraison";


const router = Router();
router.get("/list", retrieveLivraison);

//router.put("/:id", updateCommande);

//router.delete("/:id",deleteCommande);

export default router;
