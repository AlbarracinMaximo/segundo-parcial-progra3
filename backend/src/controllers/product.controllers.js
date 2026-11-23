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

const createProduct = async (req, res) => {

    try {

        await ProductModel.createProduct(
            req.body
        );

        res.status(201).json({
            mensaje: "Producto creado"
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};

const updateProduct = async (req, res) => {

    try {

        const id = req.params.id;

        await ProductModel.updateProduct(
            id,
            req.body
        );

        res.status(200).json({
            mensaje: "Producto actualizado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

const deleteProduct = async (req, res) => {

    try {

        const id = req.params.id;

        await ProductModel.deactivateProduct(id);

        res.status(200).json({
            mensaje: "Producto desactivado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};