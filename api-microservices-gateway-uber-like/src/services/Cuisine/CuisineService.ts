import { Request, Response } from "express";
import axios from "axios";

export const retrieveCommandesCuisine = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3030/api/v1/cuisine/commandes`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des commandes cuisine:", error.message);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        message: "Erreur interne API Gateway - Cuisine",
      });
    }
  }
};

export const updateStatutCuisine = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const response = await axios.patch(
      `http://localhost:3030/api/v1/cuisine/commandes/${id}/statut`,
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du statut commande:", error.message);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        message: "Erreur interne API Gateway - Cuisine",
      });
    }
  }
};
