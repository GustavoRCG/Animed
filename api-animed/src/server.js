import "dotenv/config";
import express from "express";
import cors from "cors";
import vetRoutes from "./routes/vetRoutes.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ success: true, message: "API Animed OK" })
);
app.use("/vets", vetRoutes); // Nossa nova rota

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Rota não encontrada" })
);

const PORT = process.env.PORT || 3333;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ API Animed rodando em http://localhost:${PORT}`);
});
