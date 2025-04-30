import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Commande, Status } from "../entity/Commande";

export const getCommandesCuisine = async (_: Request, res: Response) => {
  const commandeRepo = AppDataSource.getRepository(Commande);

  try {
    const commandes = await commandeRepo.find({
      where: [
        { status: Status.EN_ATTENTE },
        { status: Status.EN_PREPARATION },
      ],
    });

    return res.status(200).json(commandes);
  } catch (error) {
    return res.status(500).json({ message: "Erreur récupération commandes" });
  }
};

export const updateStatutCommande = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statut } = req.body;

  const commandeRepo = AppDataSource.getRepository(Commande);

  try {
    const commande = await commandeRepo.findOneBy({ id: parseInt(id) });

    if (!commande) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    commande.status = statut;
    await commandeRepo.save(commande);

    return res.status(200).json({ message: "Statut mis à jour", commande });
  } catch (error) {
    return res.status(500).json({ message: "Erreur mise à jour du statut" });
  }
};
