//Establece la conexión entre la app y la bd de mysql

//Importamos la libreria mysql basada en promesas (es la promesa de que en algun momento se tendrá una respuesta, pero no será inmediato, esto se usa para poder aplicar asincronia)
import mysql from "mysql2/promise";

//importa las configuraciones guardadas en el archivo de environments (es decir las variables contenidas en .env)
import environments from "../config/environments.js";

//guarda en una constante la propiedad de database que tengo en enviroments
const { database } = environments;

//crea un pool de conexiones a mysql (pool = conjunto de conexiones reutilizable)
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

//exporta la conexion para poder usarla en otros archivos del proyecto
export default connection;