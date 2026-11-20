// Este archivo centraliza las variables de entorno del proyecto para evitar repetir configuraciones y no exponer datos sensibles en el codigo

// Importamos la libreria dotenv para poder leer las variables definidas en el archivo .env
import dotenv from "dotenv";

// Carga las variables del archivo .env dentro de process.env
// override: true asegura que, si ya existe una variable en el sistema, se use la de nuestro .env local
dotenv.config({ override: true });

// Creamos y exportamos un objeto default con la configuracion del servidor y la BBDD
// El operador || define un valor por defecto en caso de que esa variable no este cargada en el .env
export default {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "petshop",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    }
};
