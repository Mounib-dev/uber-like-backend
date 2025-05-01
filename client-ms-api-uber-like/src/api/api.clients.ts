// src/controllers/clientController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { In } from "typeorm";
import { User } from "../entity/User";

export const getClientsByIds = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const ids = (req.query.ids as string)?.split(",") || [];

    if (ids.length === 0) {
      return res.status(400).json({ message: "Paramètre 'ids' requis." });
    }

    const userRepository = AppDataSource.getRepository(User);

    const clients = await userRepository.find({
      where: { id: In(ids) },
      select: ["id", "firstName"],
    });

    return res.json({ clients });
  } catch (error) {
    console.error("Erreur récupération des clients :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
