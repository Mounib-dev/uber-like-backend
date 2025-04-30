import type { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { User, UserRole } from "../entity/User";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { id, firstName, lastName, address, phoneNumber } = req.body;
  const user = new User(
    id,
    firstName,
    lastName,
    address,
    phoneNumber,
    UserRole.CLIENT
  );

  const userRepository = AppDataSource.getRepository(User);
  try {
    await userRepository.save(user);

    return res.status(201).json({
      message:
        "Utilisateur correctement sauvegardé dans la base du Microservice Cuisine",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        "Something went wrong with the server, the user was not created properly, we are sorry",
    });
  }
};
