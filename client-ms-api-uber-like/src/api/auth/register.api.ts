import type { Request, Response } from "express";
import type { Secret } from "jsonwebtoken";

import { User, UserRole } from "../../entity/User";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";

const saltRound = 10;

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { firstName, lastName, address, phoneNumber, email, password } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  const user = new User(
    firstName,
    lastName,
    address,
    phoneNumber,
    email,
    hashedPassword,
    UserRole.CLIENT
  );
  const userRepository = AppDataSource.getRepository(User);
  try {
    await userRepository.save(user);

    return res.status(201).json({
      message: "Inscription réussie, vous pouvez à présent vous connecter",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        "Something went wrong with the server, the user was not created properly, we are sorry",
    });
  }
};
