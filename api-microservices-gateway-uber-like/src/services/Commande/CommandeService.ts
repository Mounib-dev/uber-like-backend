import { Request, Response } from "express";
import axios from "axios";

export const createCommande = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await axios.post(
      `http://localhost:3020/api/v1/commande/create`,
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 201) {
      try {
        // Save within Client Service
        const responseFromClientService = await axios.post(
          `http://localhost:3010/api/v1/commande/save`,
          response.data.commande,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // Save within Cuisine Service
        const responseFromCuisineService = await axios.post(
          `http://localhost:3030/api/v1/commande/save`,
          response.data.commande,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // Save within Livraison Service
        const responseFromLivraisonService = await axios.post(
          `http://localhost:3040/api/v1/commande/save`,
          response.data.commande,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        console.error(err);
      }
    }

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Erreur lors de la création de la commande:", error.message);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        message: "Erreur interne API Gateway",
      });
    }
  }
};

export const retrieveCommande = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3020/api/v1/commande/list`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération des commandes:",
      error.message
    );

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        message: "Erreur interne API Gateway",
      });
    }
  }
};
