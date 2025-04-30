import { Router } from "express";
import { getCommandesCuisine, updateStatutCommande } from "../api/api.cuisine";


const router = Router();

router.get("/commandes", getCommandesCuisine);
router.patch("/commandes/:id/statut", updateStatutCommande);

export default router;
