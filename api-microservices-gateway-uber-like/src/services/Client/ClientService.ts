import axios from "axios";
import { Request, Response, RequestHandler } from "express";
import { AuthenticatedRequest } from "../../middlewares/authorize";

export async function registerUser(req: Request, res: Response) {
  try {
    const response = await axios.post(
      "http://localhost:3010/api/v1/user/register",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.status(response.status).json({
      ...response.data,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error.message);

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Erreur interne API Gateway" });
    }
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const response = await axios.post(
      "http://localhost:3010/api/v1/auth/login",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.status(response.status).json({
      ...response.data,
    });
  } catch (error: any) {
    console.error("Erreur de login:", error.message);

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Erreur interne API Gateway" });
    }
  }
}

type UserInfo = {
  firstName: string;
  lastName: string;
};
export const userInfo: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
): Promise<UserInfo | any> => {
  try {
    const user = await axios.get(process.env.API_V1_MS_CLIENT + "/user/info");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }
    console.log(user);
    return res.status(200).json(user.data);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message:
        "Something went wrong with the server, the user was not created properly, we are sorry",
    });
  }
};

export async function getClientsByIds(
  req: Request,
  res: Response
): Promise<any> {
  try {
    console.log("test");
    const ids = (req.query.ids as string)?.split(",") || [];
    const response = await axios.get(
      `http://localhost:3010/api/v1/client/clients?ids=${ids}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.status(response.status).json({
      ...response.data,
    });
  } catch (error: any) {
    console.error("Erreur de login:", error.message);

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Erreur interne API Gateway" });
    }
  }
}
