//este archivo crea y configura el servidor backend de Express,
//registra middlewares, rutas y pone el servidor en funcionamiento

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
//Importa la conexión a la base de datos, permite ejecutar consultas SQL desde este archivo
import connection from "./src/database/db.js";
//Importa el modulo con las rutas de los productos
import productRoutes from "./src/routes/product.routes.js";
// Importa el modulo con las rutas de ventas
import ventasRoutes from "./src/routes/ventas.routes.js";
// Importamos __dirname y join para ubicar las carpetas de vistas EJS y archivos estaticos
import { __dirname, join } from "./src/utils/index.js";
// Importamos las rutas que renderizan las vistas EJS del administrador
import viewRoutes from "./src/routes/view.routes.js";


/*==================
    Config
==================*/
// Creamos una instancia de aplicacion de Express; app contendra todos los metodos para crear rutas, recibir peticiones, enviar respuestas e iniciar el servidor
const app = express();
// Guardamos el puerto traido del .env (si no existe, usa el 3000 por defecto)
const PORT = environments.port || 3000;

// Configuramos EJS como motor de plantillas y le indicamos donde estan las vistas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));


/*==================
    Middlewares
==================*/
// Middleware CORS basico para permitir solicitudes desde otros origenes (como nuestro frontend)
app.use(cors());

// Cuando enviamos informacion en el body de la request (por ejemplo en POST y PUT), este middleware parsea el JSON recibido y 
// lo convierte en un objeto JS disponible en req.body, esto nos permite acceder a los datos desde los endpoints
app.use(express.json());

// Middleware para servir archivos estaticos (CSS, JS e imagenes) directamente desde la carpeta frontend
app.use(express.static(join(__dirname, "../frontend")));


/*==================
    Rutas
==================*/
// Ruta principal para chequear que el servidor este funcionando
// req: el requerimiento/peticion que envia el cliente | res: la respuesta (response) que devolvemos al cliente
app.get("/", (req, res) => {
    // Envia una respuesta de texto plano al navegador para verificar que el servidor responde
    res.send("Backend funcionando");
});

// Redirijo todas las peticiones que empiecen con /api/admin al archivo admin.routes.js
// Por ejemplo, la ruta /login definida dentro de adminRoutes queda accesible en POST /api/admin/login
app.use("/api/admin", adminRoutes);

//redirecciona todas las rutas que comiencen con /api/productos
//al archivo product.routes.js
app.use("/api/productos", productRoutes);

// Redirecciona todas las rutas que comiencen con /api/ventas a ventas.routes.js
app.use("/api/ventas", ventasRoutes);

// Rutas de vistas HTML renderizadas con EJS para el panel de administrador
app.use("/", viewRoutes);

//endpoint de prueba para obtener todos los productos directamente desde la base de datos
//async se usa para definir que la operacion sera asincrona, es decir puede tardar un tiempo en completarse, se la implementa acá porque voy a usar el AWAIT
app.get("/productos", async (req, res) => {

    try {
        //guardo en la constante rows los registros que me devuelve la consulta sql
        const [rows] =
            //uso await para esperar el resultado de la consulta sql, ejecuto una consula sobre la base de datos
            await connection.query(
                //codigo sql, obtengo los registros de la tabla indicada (productos)
                "SELECT * FROM productos"
            );
//convierto automaticamente los resultados que me dió la consulta en un JSON, y se los envio al usuario (por eso res)
        res.json(rows);

    } catch (error) {
        //muestro el error en la consola del servidor
        console.error(error);

        // indica al navegador que hubo un error en el servidor (el codigo http 500 es INTERNAL SERVER ERROR)
        // envia la respuesta en formato JSON, creando un objeto js con el mensaje del error, al cliente
        res.status(500).json({
            error: error.message
        });
    }
});

/*=========================
    Inicio del servidor
=========================*/
// Inicia el servidor y queda a la escucha de peticiones/solicitudes en el puerto configurado
app.listen(PORT, () => {
    //check en consola de inicio correcto del servidor
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
