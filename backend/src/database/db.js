// Establece la conexion entre la aplicacion backend y la base de datos MySQL

// Importamos el modulo mysql2 en modo promesas para poder hacer consultas asincronas (con async/await) a la BBDD
import mysql from "mysql2/promise";

// Importamos las configuraciones guardadas en environments.js (es decir, las variables traidas desde el .env)
import environments from "../config/environments.js";

// Extraemos (con destructuring) la propiedad database del objeto environments
const { database } = environments;

// Creamos un pool de conexiones a MySQL (pool = conjunto de conexiones reutilizables)
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

// Exportamos el pool de conexiones para poder ejecutar consultas SQL desde otros archivos del proyecto
export default connection;

/*
- mysql2/promise es el modulo que nos permite conectarnos a MySQL usando promesas (async/await).
- createPool es una funcion que crea un grupo (pool) de conexiones a la BBDD:
    - Gestiona las conexiones automaticamente y las reutiliza en lugar de abrir y cerrar una nueva en cada consulta.
    - Se conecta a la BBDD usando los parametros host, database, user y password que vienen del .env.
    - Por defecto permite abrir varias conexiones simultaneas (hasta 10).
    - Gracias a mysql2/promise podemos usar await connection.query() para ejecutar sentencias SQL.
- Este objeto connection es el que importamos en las rutas o modelos para consultar la base de datos.
*/
