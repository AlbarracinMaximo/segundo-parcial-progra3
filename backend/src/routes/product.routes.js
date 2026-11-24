import { Router } from "express";

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

import {
    validateId,
    validateProduct
}
from "../middlewares/product.middleware.js";

const router = Router();

router.get("/", getProducts);

router.get(
    "/admin/todos",
    getProductsAdmin
);

router.get(
    "/:id",
    validateId,
    getProduct
);

router.post(
    "/",
    validateProduct,
    createProduct
);

router.put(
    "/:id",
    validateId,
    validateProduct,
    updateProduct
);

router.delete(
    "/:id",
    validateId,
    deleteProduct
);

router.put(
    "/activar/:id",
    validateId,
    activateProduct
);

export default router;