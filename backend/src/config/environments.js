//libreria para leer las variables del archivo .env
import dotenv from "dotenv";

//carga las variables del archivo .env dentro de process.env
dotenv.config({ override: true });

//Crea y exporta un objeto default, lo usamos para evitar repetir configuraciones en el proyecto
export default {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "petshop",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    }
};
