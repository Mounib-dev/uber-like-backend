import dotenv from "dotenv";
dotenv.config();

import express, { RequestHandler } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import api from "./routes";
import userServiceRoutes from "./routes/ClientService.route";
import commandeServiceRoutes from "./routes/CommandeService.route";
import livraisonServiceRoutes from "./routes/LivraisonService.route";
import cuisineGatewayRoutes from "./routes/CuisineService.route";




const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", api);
app.use("/gateway/client-service", userServiceRoutes);
app.use("/gateway/commande-service", commandeServiceRoutes);
app.use("/gateway/livraison-service", livraisonServiceRoutes);
app.use("/api/v1/cuisine", cuisineGatewayRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `[server]:🗄️  Gateway Server is running at http://localhost:${port}`
  );
});

export default app;
