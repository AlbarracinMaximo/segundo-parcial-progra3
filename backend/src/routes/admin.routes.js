//Herramienta de libreria Express
import { Router } from "express";
import connection from "../database/db.js";

/* ----------------------------------
       AUTENTICACIÓN ADMINISTRADOR 
  ----------------------------------- */

// Utilizamos Router para la ruta de autenticacion.Lo inicializamos
const router = Router();


// Es lo mismo que app.post
router.post("/login", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({
                error: "Por favor complete usuario y contraseña"
            });
        }

        // Buscamos el administrador en la base de datos
        const [rows] = await connection.query(
            "SELECT * FROM administradores WHERE usuario = ?",
            [usuario]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                error: "Usuario no encontrado"
            });
        }

        const admin = rows[0];

        // Verificamos contraseña
        if (admin.password !== password) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            });
        }

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: admin.id_usuario,
                usuario: admin.usuario
            }
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: error.message });
    }
});

//Exporto las rutas del archivo prinpcipalmente para el index.js
export default router;
