import express from "express";
import { createServer } from "http";
import cors from "cors";

//import routers
import healthCheckRouter from "./routers/healthCheck.routers";
import musicRouter from "./routers/music.router";

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes
app.use("/api/health", healthCheckRouter);
app.use("/api/v1/music", musicRouter);

export { httpServer };
