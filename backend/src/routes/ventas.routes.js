// Este archivo define las rutas relacionadas con las ventas del autoservicio
/*======================
    Rutas ventas
======================*/

import { Router } from "express";
import { createVenta, getVentas } from "../controllers/ventas.controllers.js";

// Inicializamos Router para agrupar las rutas de ventas
const router = Router();

// POST /api/ventas -> registra una nueva venta y su detalle en MySQL
router.post("/", createVenta);

// GET /api/ventas -> devuelve el listado de ventas junto con sus productos asociados
router.get("/", getVentas);

// Exportamos el router para conectarlo en backend/index.js
export default router;