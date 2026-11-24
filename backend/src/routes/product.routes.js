import { Router } from "express";

import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
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
    validateProduct,
    updateProduct
);

router.delete(
    "/:id",
    validateId,
    deleteProduct
);

export default router;