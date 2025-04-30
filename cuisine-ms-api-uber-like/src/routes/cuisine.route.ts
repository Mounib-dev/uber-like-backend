// src/routes/cuisineRoutes.ts
import { Router } from "express";
import { getCommandesCuisine, updateStatutCommande } from "../api/api.cuisine";

const router = Router();

// Voir les commandes à traiter (en attente ou en préparation)
router.get("/commandes", getCommandesCuisine);

// Mettre à jour le statut d'une commande (en préparation, prêt, etc.)
router.patch("/commandes/:id/statut", updateStatutCommande);

export default router;
