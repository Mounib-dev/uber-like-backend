import { RequestHandler } from "express";
import { Commande, Status } from "../entity/Commande";
import { AppDataSource } from "./../data-source";

import { Request, Response } from "express";

export const createCommande = async (req: Request, res: Response) :Promise<any>=> {
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

// export const retrieveCommandes: RequestHandler = async (_req, res) => {
//   const commandeRepository = AppDataSource.getRepository(Commande);
//   try {
//     const commandes = await commandeRepository.find();
//     return res.status(200).json({ commandes });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Erreur lors de la récupération des commandes",
//     });
//   }
// };

// export const updateCommandeStatus: RequestHandler<{ id: string }> = async (
//   req,
//   res
// ) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const commandeRepository = AppDataSource.getRepository(Commande);

//   try {
//     const commande = await commandeRepository.findOne({ where: { id: +id } });
//     if (!commande) {
//       return res.status(404).json({
//         message: "Commande introuvable",
//       });
//     }

//     if (!Object.values(Status).includes(status)) {
//       return res.status(400).json({
//         message: "Statut invalide",
//       });
//     }

//     commande.status = status;
//     await commandeRepository.save(commande);

//     return res.status(200).json({
//       message: "Statut de la commande mis à jour",
//       commande,
//     });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Erreur lors de la mise à jour du statut",
//     });
//   }
// };

// export const deleteCommande: RequestHandler<{ id: string }> = async (
//   req,
//   res
// ) => {
//   const { id } = req.params;
//   const commandeRepository = AppDataSource.getRepository(Commande);
//   try {
//     const result = await commandeRepository.delete(+id);
//     if (result.affected === 0) {
//       return res.status(404).json({
//         message: "Commande introuvable",
//       });
//     }
//     return res.status(204).send();
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Erreur lors de la suppression de la commande",
//     });
//   }
//};
