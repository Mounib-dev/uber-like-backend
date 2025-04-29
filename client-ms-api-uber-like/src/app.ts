import dotenv from "dotenv";
dotenv.config();

import express, { RequestHandler } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { AppDataSource } from "./data-source";

import api from "./routes";

import loginRoute from "./routes/auth/login.route";
import registerRoutes from "./routes/auth/register.route";
import userRoute from "./routes/auth/profile.route";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("🛢️  Connected To Database Client");
  })
  .catch((err) => {
    console.error(err);
    console.log("⚠️ Error to connect Database Client");
  });

app.use("/", api);
app.use("/api/v1/auth", loginRoute);
app.use("/api/v1/user", registerRoutes, userRoute);

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(
    `[server]:🗄️  Client Microservice Server is running at http://localhost:${port}`
  );
});

export default app;
