import axios from "axios";
import type {Request, Response } from "express"

export const retrieveLivraison = async (req: Request, res: Response) :Promise<any>=>{
  try {
    const response = await axios.get("http://localhost:3020/api/v1/commande/list");
    console.log("Commandes reçues :", response.data.commandes);
    return res.status(200).json(response.data.commandes);
  
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return res.status(500).json({message: "Erreur"});
  }
};
