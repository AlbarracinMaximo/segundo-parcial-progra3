import ProductModel from "../models/product.models.js";

const getProducts = async (req, res) => {
    try {
        const products =
            await ProductModel.getAllProducts();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product =
            await ProductModel.getProductById(id);

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

export {
    getProducts,
    getProduct
};