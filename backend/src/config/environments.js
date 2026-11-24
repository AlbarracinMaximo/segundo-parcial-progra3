// Este archivo centraliza las variables de entorno del proyecto para evitar repetir configuraciones y no exponer datos sensibles en el codigo

// Importamos la libreria dotenv para poder leer las variables definidas en el archivo .env
import dotenv from "dotenv";

// Carga las variables del archivo .env dentro de process.env
// override: true asegura que, si ya existe una variable en el sistema, se use la de nuestro .env local
dotenv.config({ override: true });

//Crea y exporta un objeto default, lo usamos para evitar repetir configuraciones en el proyecto
export default {
    
    //define el puerto donde se ejecutará el servidor
    //si no existe PORT en el archivo .env se utiliza 3000
    port: process.env.PORT || 3000,

    //agrupa la configuración de conexión a la base de datos
    database: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "petshop",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    }
};
