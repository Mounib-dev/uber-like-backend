import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Commande, Status } from "../entity/Commande";

// Obtenir les commandes en attente ou en préparation
export const getCommandesCuisine = async (_: Request, res: Response) => {
  const commandeRepo = AppDataSource.getRepository(Commande);
  try {
    const commandes = await commandeRepo.find({
      where: [{ status: Status.EN_ATTENTE }, { status: Status.EN_PREPARATION }],
    });
    return res.json(commandes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// Mettre à jour le statut d'une commande (id donné par l'URL)
export const updateStatutCommande = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // attendu : en préparation / prêt

  const commandeRepo = AppDataSource.getRepository(Commande);

  try {
    const commande = await commandeRepo.findOneBy({ id: Number(id) });
    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    commande.status = status;
    await commandeRepo.save(commande);

    return res.json({ message: "Statut mis à jour", commande });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur de mise à jour" });
  }
};
