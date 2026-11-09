import express from "express";
import cors from "cors";
import environments from "./src/config/environments.js";
import adminRoutes from "./src/routes/admin.routes.js";

const app = express();
const PORT = environments.port || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Chequeo del servidor
app.get("/", (req, res) => {
    res.send("Backend autoservicio funcionando");
});

// Rutas de administracion
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
