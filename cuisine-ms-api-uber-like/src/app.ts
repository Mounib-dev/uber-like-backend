import dotenv from "dotenv";
dotenv.config();

import express, { RequestHandler } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import api from "./routes";

import commandeRoutes from "./routes/commande.route";
import { AppDataSource } from "./data-source";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("🛢️  Connected To Database Cuisine");
  })
  .catch((err) => {
    console.error(err);
    console.log("⚠️ Error to connect Database Cuisine");
  });

app.use("/", api);

app.use("/api/v1/commande", commandeRoutes);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`[server]:🗄️  Server is running at http://localhost:${port}`);
});

export default app;
