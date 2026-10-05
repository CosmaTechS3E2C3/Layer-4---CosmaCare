import express from "express";
import { registerRoutes } from "./config";

const app = express();
app.use(express.json());

registerRoutes(app);

app.listen(3000, () => {
  console.log("CosmaCare Layer‑4 API running on port 3000");
});

