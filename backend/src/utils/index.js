// Logica para construir __dirname en ES Modules (en Node ESM no existe __dirname por defecto)
import { join } from "path";

// import.meta.dirname apunta a backend/src/utils; subiendo 2 niveles ("../../") apuntamos a la raiz de backend/
const __dirname = join(import.meta.dirname, "../../");
export {
    __dirname,
    join
};