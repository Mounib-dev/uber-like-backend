import { AppDataSource } from "../data-source";

import { Request, Response } from "express";
import { Commande, Status } from "../entity/Commande";

export const saveCommande = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { clientId, plats } = req.body;
  const commandeRepository = AppDataSource.getRepository(Commande);

  const newCommande = commandeRepository.create({
    clientId,
    plats,
    status: Status.EN_ATTENTE,
  });

  try {
    await commandeRepository.save(newCommande);
    return res.status(201).json({
      message: "Commande créée avec succès",
      commande: newCommande,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: "Erreur lors de la création de la commande",
    });
  }
};

export const retrieveCommande = async (
  req: Request,
  res: Response
): Promise<any> => {
  const commandeRepository = AppDataSource.getRepository(Commande);
  try {
    const commandes = await commandeRepository.find();
    return res.status(200).json({ commandes });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: "Erreur lors de la récupération des commandes",
    });
  }
};
