//libreria para leer las variables del archivo .env
import dotenv from "dotenv";

//carga las variables del archivo .env dentro de process.env
dotenv.config();

//Crea y exporta un objeto default, lo usamos para evitar repetir configuraciones en el proyecto
export default {
    port: process.env.PORT,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};
