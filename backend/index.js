// Este archivo crea el servidor Express, configura los middlewares, conecta las rutas disponibles y pone el servidor en funcionamiento

/*==================
    Importaciones
==================*/
// Express simplifica la creacion de servidores web y APIs REST
import express from "express";
// CORS permite que el frontend (que corre en otro origen/puerto) pueda hacer peticiones a este backend
import cors from "cors";
// Traemos las variables de entorno (por ejemplo, el puerto del servidor) desde environments.js
import environments from "./src/config/environments.js";
// Importamos el modulo con las rutas de administracion (como el login)
import adminRoutes from "./src/routes/admin.routes.js";


/*==================
    Config
==================*/
// Creamos una instancia de aplicacion de Express; app contendra todos los metodos para crear rutas, recibir peticiones, enviar respuestas e iniciar el servidor
const app = express();
// Guardamos el puerto traido del .env (si no existe, usa el 3000 por defecto)
const PORT = environments.port || 3000;


/*==================
    Middlewares
==================*/
// Middleware CORS basico para permitir solicitudes desde otros origenes (como nuestro frontend)
app.use(cors());

// Cuando enviamos informacion en el body de la request (por ejemplo en POST y PUT), este middleware parsea el JSON recibido y lo convierte en un objeto JS disponible en req.body
app.use(express.json());


/*==================
    Rutas
==================*/
// Ruta principal para chequear que el servidor este funcionando
// req: el requerimiento/peticion que envia el cliente | res: la respuesta (response) que devolvemos al cliente
app.get("/", (req, res) => {
    // Envia una respuesta de texto plano al navegador para verificar que el servidor responde
    res.send("Backend autoservicio funcionando");
});

// Redirijo todas las peticiones que empiecen con /api/admin al modulo admin.routes.js
// Por ejemplo, la ruta /login definida dentro de adminRoutes queda accesible en POST /api/admin/login
app.use("/api/admin", adminRoutes);


/*=========================
    Inicio del servidor
=========================*/
// Inicia el servidor y queda a la escucha de peticiones/solicitudes en el puerto configurado
app.listen(PORT, () => {
    // Check en la consola del servidor para confirmar que inicio correctamente
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
