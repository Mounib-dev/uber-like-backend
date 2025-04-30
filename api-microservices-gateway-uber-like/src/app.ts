import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import api from "./routes";
import userServiceRoutes from "./routes/ClientService.route";
import commandeServiceRoutes from "./routes/CommandeService.route";
import livraisonServiceRoutes from "./routes/LivraisonService.route";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", api);
app.use("/gateway/client-service", userServiceRoutes);
app.use("/gateway/commande-service", commandeServiceRoutes);
app.use("/gateway/livraison-service", livraisonServiceRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 3000;

const server = createServer(app);
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

app.set("io", io);

// app.listen(port, () => {
//   console.log(
//     `[server]:🗄️  Gateway Server is running at http://localhost:${port}`
//   );
// });

io.on("connection", (socket) => {
  console.log("🔌 New client connected");
  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

server.listen(port, () => {
  console.log(
    `[server]:🗄️  Gateway Server is running at http://localhost:${port}`
  );
});

// export default app;
export default server;
