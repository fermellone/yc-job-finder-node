// src/app.ts

import express, { Application } from "express";
import { setRoutes } from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(
  express.urlencoded({
    extended: false,
  })
); //Parse URL-encoded bodies

// Add cors
app.use(cors());

// Middleware
app.use(express.json());

// Routes
setRoutes(app);

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});

export default app;
