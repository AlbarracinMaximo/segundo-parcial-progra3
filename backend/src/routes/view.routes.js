/*======================
    Rutas de vistas EJS
======================*/
import { Router } from "express";
import {
    vistaLogin,
    vistaDashboard,
    vistaAltaProducto,
    vistaEditarProducto
} from "../controllers/view.controllers.js";

const router = Router();

// Vistas renderizadas con EJS para el panel de administrador
router.get("/login", vistaLogin);
router.get("/dashboard", vistaDashboard);
router.get("/dashboard/alta", vistaAltaProducto);
router.get("/dashboard/editar", vistaEditarProducto);

export default router;