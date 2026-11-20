// Este archivo define las rutas de administracion (en este caso, la autenticacion/login del administrador)

/*===========================
    Rutas de autenticacion
===========================*/
// Router es una herramienta de Express que funciona como una "mini aplicacion de express" para modularizar rutas y no cargar todo en index.js
import { Router } from "express";
// Importamos el pool de conexion a la base de datos para poder ejecutar consultas SQL desde este archivo
import connection from "../database/db.js";

// Inicializamos Router (hacemos lo mismo que con const app = express(), pero solo para este grupo de rutas)
const router = Router();


/////////////////////////////////
// POST login administrador
// Es lo mismo que app.post, pero montado bajo /api/admin en index.js -> ruta final: POST /api/admin/login
// Usamos async porque adentro vamos a hacer una consulta a la BBDD con await (operacion asincrona que puede tardar)
router.post("/login", async (req, res) => {
    // Optimizacion: Manejo de errores con try ... catch para evitar que se caiga el servidor si falla la BBDD
    try {
        // Extraemos (con destructuring) usuario y password del cuerpo de la peticion HTTP
        // Gracias al middleware app.use(express.json()) en index.js, el JSON enviado desde el frontend ya llega convertido en objeto JS
        const { usuario, password } = req.body;

        // Validamos que hayan llegado ambos campos obligatorios
        if (!usuario || !password) {
            // Devolvemos codigo HTTP 400 (Bad Request: faltan datos en la peticion)
            // Gracias al return, termina la logica del endpoint aca y no continua ejecutando el codigo de abajo
            return res.status(400).json({
                error: "Por favor complete usuario y contraseña"
            });
        }

        // Buscamos el administrador en la base de datos
        // Con const [rows] hacemos destructuring para quedarnos SOLO con las filas devueltas por la consulta (y no con los metadatos de la tabla)
        // Usamos await para esperar a que MySQL devuelva el resultado
        // El placeholder "?" evita ataques de inyeccion SQL: es la forma segura de pasar parametros a la consulta
        const [rows] = await connection.query(
            "SELECT * FROM administradores WHERE usuario = ?",
            [usuario]
        );

        // Chequeamos si la consulta no devolvio ningun registro (es decir, ese usuario no existe en la BBDD)
        if (rows.length === 0) {
            // Devolvemos codigo HTTP 401 (Unauthorized: credenciales invalidas) y cortamos con return
            return res.status(401).json({
                error: "Usuario no encontrado"
            });
        }

        // Como el campo usuario es UNIQUE en la tabla, tomamos el primer (y unico) registro encontrado
        const admin = rows[0];

        // Verificamos si la contraseña ingresada coincide con la guardada en la base de datos
        if (admin.password !== password) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            });
        }

        // Si paso todas las validaciones, respondemos con codigo HTTP 200 (OK) y un JSON para el frontend
        // Devolvemos solo id y usuario (nunca enviamos la contraseña al frontend por seguridad)
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: admin.id_usuario,
                usuario: admin.usuario
            }
        });

    } catch (error) {
        // Mostramos el error completo en la consola del servidor para poder depurarlo
        console.error("Error en login:", error);

        // Indicamos al cliente que hubo un error interno del servidor (HTTP 500: Internal Server Error) en formato JSON
        res.status(500).json({ error: error.message });
    }
});

// Exportamos el router para poder importarlo y conectarlo en index.js con app.use("/api/admin", adminRoutes)
export default router;
