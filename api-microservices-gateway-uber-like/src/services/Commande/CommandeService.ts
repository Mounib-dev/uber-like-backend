import { Request, Response } from "express";
import axios from "axios";

export const createCommande = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await axios.post(
      ` http://localhost:3020/api/v1/commande/create`, // Assure-toi que cette URL est définie dans ton .env
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(response.status).json(
     
       response.data,
    );
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


export const retrieveCommande = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3020/api/v1/commande/list`, // Assure-toi que cette URL est correcte
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des commandes:", error.message);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({
        message: "Erreur interne API Gateway",
      });
    }
  }
};
