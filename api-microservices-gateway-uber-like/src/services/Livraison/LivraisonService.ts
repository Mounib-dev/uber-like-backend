import { Request, Response } from "express";
import axios from "axios";

export const retrieveLivraison = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3040/api/v1/livraison/list`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des livraisons:", error.message);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        message: "Erreur interne API Gateway",
      });
    }
  }
};
