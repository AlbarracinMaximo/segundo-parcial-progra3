// Este doc crea el servidor express, define las rutas disponibles y pone el servidor en funcionmamiento

//Express simplifica la creación de servidores web y APIs REST
import express from "express";

//CORS permite conectar el frontend con el backend desde distintos orígenes
import cors from "cors";

//Importa la conexión a la base de datos, permite ejecutar consultas SQL desde este archivo
import connection from "./src/database/db.js";

//Importa las variables de entorno para usar el puerto configurado
import environments from "./src/config/environments.js";

//Importa las rutas del administrador (login)
import adminRoutes from "./src/routes/admin.routes.js";

//instancia de la aplicación Express, la guarda en una constante, será utilizada para: crear rutas, recibir peticiones, enviar respuestas, iniciar el servidor
const app = express();
const PORT = environments.port || 3000;

//Middlewares para permitir peticiones cruzadas y parsear JSON que viene del formulario
app.use(cors());
app.use(express.json());

//la ruta principal de la app, req: el requerimiento del cliente, res: respuesta (response) envia la rta al cliente
app.get("/", (req, res) => {
    //chequeo de que el servidor este funcionando, envia una respuesta de texto al navegador
    res.send("Backend autoservicio funcionando");
});

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
        //convierto automaticamente los resultados que me dió la consulta en un JSON, y se los envio al cliente (por eso res)
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

//Rutas de administracion
app.use("/api/admin", adminRoutes);

//inicia el servidor, quedando a la escucha de peticiones/solicitudes. Lo inicia en el puerto configurado
app.listen(PORT, () => {
    //check en consola de inicio correcto del servidor
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
