import dotenv from "dotenv";

// Carga las variables del archivo .env con override para desarrollo local
dotenv.config({ override: true });

export default {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "petshop",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    }
};
