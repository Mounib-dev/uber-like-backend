import { Router } from "express";

import authorizeUser from "../middlewares/authorize";
import { retrieveLivraison } from "../services/Livraison/LivraisonService";


const router = Router();
router.get("/list", retrieveLivraison);

//router.put("/:id", updateCommande);

//router.delete("/:id",deleteCommande);

export default router;
