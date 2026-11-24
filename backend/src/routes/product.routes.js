//este archivo define todas las rutas relacionadas con la gestión de productos

//importa Router de Express para agrupar rutas
import { Router } from "express";

//importa los controladores encargados de ejecutar la lógica de cada operación sobre productos
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    activateProduct,
    getProductsAdmin
}
from "../controllers/product.controllers.js";

//importa los middlewares utilizados para validar ids y datos de productos
import {
    validateId,
    validateProduct
}
from "../middlewares/product.middleware.js";

//crea una instancia de Router para organizar las rutas relacionadas con productos
const router = Router();

//ruta GET utilizada para obtener todos los productos activos
router.get("/", getProducts);

//ruta GET utilizada por el dashboard administrador para obtener productos activos e inactivos
router.get(
    "/admin/todos",
    getProductsAdmin
);

//ruta GET utilizada para obtener un producto específico según el id recibido por parámetro
router.get(
    "/:id",
    validateId,
    getProduct
);

//ruta POST utilizada para crear un nuevo producto
router.post(
    "/",
    validateProduct,
    createProduct
);

//ruta PUT utilizada para modificar un producto existente
router.put(
    "/:id",
    validateId,
    validateProduct,
    updateProduct
);

//ruta DELETE utilizada para realizar la baja lógica de un producto
router.delete(
    "/:id",
    validateId,
    deleteProduct
);

//ruta PUT utilizada para reactivar un producto
router.put(
    "/activar/:id",
    validateId,
    activateProduct
);

//exporta las rutas para que puedan ser utilizadas desde el archivo principal del servidor
export default router;