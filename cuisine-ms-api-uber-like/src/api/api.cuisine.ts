import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Commande, Status } from "../entity/Commande";

export const getCommandesCuisine = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const commandeRepo = AppDataSource.getRepository(Commande);

  try {
    const commandes = await commandeRepo.find({
      where: [
        { status: Status.EN_ATTENTE },
        { status: Status.EN_PREPARATION },
      ],
    });

    res.status(200).json(commandes);
  } catch (error) {
    next(error); 
  }
};

export const updateStatutCommande = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { statut } = req.body;

  const commandeRepo = AppDataSource.getRepository(Commande);

  try {
    const commande = await commandeRepo.findOneBy({ id: parseInt(id) });

    if (!commande) {
      res.status(404).json({ message: "Commande introuvable" });
      return;
    }

    commande.status = statut;
    await commandeRepo.save(commande);

    res.status(200).json({ message: "Statut mis à jour", commande });
  } catch (error) {
    next(error);
  }
};
