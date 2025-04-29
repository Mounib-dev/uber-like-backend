import type { Request, Response } from "express";
import type { Credentials } from "../../types/auth.types";
import type { JwtPayload, Secret } from "jsonwebtoken";

import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = <Secret>process.env.JWT_SECRET;

export interface AuthPayload extends JwtPayload {
  id: number;
  role: string;
}

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = <Credentials>req.body;
  const userRepisitory = AppDataSource.getRepository(User);
  try {
    const user = await userRepisitory.findOneBy({
      email: email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const matchedPasswords = await bcrypt.compare(password, user.password);
    if (!matchedPasswords) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const payload: AuthPayload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        "Something went wrong with the server, the user was not updated properly, we are sorry",
    });
  }
};
