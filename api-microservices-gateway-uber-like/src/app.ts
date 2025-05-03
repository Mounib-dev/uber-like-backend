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
const connectedUsers = new Map();
const connectedDeliveryPersons = new Map();
const connectedChefs = new Map();
io.on("connection", (socket) => {
  console.log("🔌 New client connected");

  // Register user with a specific socket id
  socket.on("register", (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`✅ Registered user ${userId} with socket id ${socket.id}`);
  });

  socket.on("register delivery person", (deliveryPersonId) => {
    connectedDeliveryPersons.set(deliveryPersonId, socket.id);
    console.log(
      `✅ Registered user (delivery person) ${deliveryPersonId} with socket id ${socket.id}`
    );
  });

  socket.on("register chef", (chefId) => {
    connectedChefs.set(chefId, socket.id);
    console.log(
      `✅ Registered user (chef) ${chefId} with socket id ${socket.id}`
    );
  });

  socket.on("accept order", ({ commandeId, clientId, plats }) => {
    console.log(clientId);
    console.log(commandeId);
    console.log(connectedUsers);
    const clientSocketId = connectedUsers.get(clientId);
    console.log(clientSocketId);
    if (clientSocketId) {
      io.to(clientSocketId).emit("inform client about preparation", {
        commandeId,
      });
      for (const [
        deliveryPersonId,
        socketId,
      ] of connectedDeliveryPersons.entries()) {
        io.to(socketId).emit("inform livreur about new accepted commande", {
          commandeId,
          clientId,
          plats,
        });
      }
    } else {
      console.log(`⚠️ Client ${clientId} not connected`);
    }
  });

  socket.on("order is ready", ({ commandeId, clientId, plats }) => {
    console.log(clientId);
    const clientSocketId = connectedUsers.get(clientId);
    console.log(clientSocketId);
    if (clientSocketId) {
      io.to(clientSocketId).emit("inform client order is ready", {
        commandeId,
      });
      for (const [
        deliveryPersonId,
        socketId,
      ] of connectedDeliveryPersons.entries()) {
        io.to(socketId).emit("inform livreur order is ready", {
          commandeId,
        });
      }
    } else {
      console.log(`⚠️ Client ${clientId} not connected`);
    }
  });

  socket.on(
    "inform restaurant about new commande",
    ({ commandeId, clientId, plats }) => {
      console.log(clientId);
      for (const [chefId, socketId] of connectedChefs.entries()) {
        io.to(socketId).emit("inform restaurant", {
          commandeId,
          clientId,
          plats,
        });
      }
    }
  );

  socket.on("start delivery", ({ commandeId, clientId, plats }) => {
    console.log(clientId);
    const clientSocketId = connectedUsers.get(clientId);
    console.log(clientSocketId);
    if (clientSocketId) {
      io.to(clientSocketId).emit("inform client delivery started", {
        commandeId,
      });
      for (const [chefId, socketId] of connectedChefs.entries()) {
        io.to(socketId).emit("inform restaurant delivery started", {
          commandeId,
        });
      }
    } else {
      console.log(`⚠️ Client ${clientId} not connected`);
    }
  });

  socket.on("order delivered", ({ commandeId, clientId, plats }) => {
    console.log(clientId);
    const clientSocketId = connectedUsers.get(clientId);
    console.log(clientSocketId);
    if (clientSocketId) {
      io.to(clientSocketId).emit("inform client order delivered", {
        commandeId,
      });
      for (const [chefId, socketId] of connectedChefs.entries()) {
        io.to(socketId).emit("inform restaurant order delivered", {
          commandeId,
        });
      }
    } else {
      console.log(`⚠️ Client ${clientId} not connected`);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(userId);
        console.log(`❌ User ${userId} disconnected`);
        break;
      }
    }
  });
});

server.listen(port, () => {
  console.log(
    `[server]:🗄️  Gateway Server is running at http://localhost:${port}`
  );
});

// export default app;
export default server;
