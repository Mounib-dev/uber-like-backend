import { Router } from "express";
import {
  retrieveCommandesCuisine,
  updateStatutCuisine
} from "../services/Cuisine/CuisineService";
import authorizeUser from "../middlewares/authorize";
const router = Router();

router.get("/commandes", retrieveCommandesCuisine);
router.patch("/commandes/:id/statut", updateStatutCuisine);

export default router;
