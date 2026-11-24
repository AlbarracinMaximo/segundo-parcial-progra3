//importa el modelo de productos, encargado de interactuar con la base de datos
import ProductModel from "../models/product.models.js";

//controlador encargado de obtener todos los productos activos
const getProducts = async (req, res) => {
    try {
        //solicita al modelo todos los productos activos
        const products =
            await ProductModel.getAllProducts();
        //devuelve los productos obtenidos en formato JSON
        res.status(200).json(products);
    } catch (error) {
        //si ocurre un error devuelve código 500 (Internal Server Error)
        res.status(500).json({
            error: error.message
        });
    }
};

//controlador encargado de obtener un producto específico según el id recibido en la URL

const getProduct = async (req, res) => {
    try {
        //obtiene el id validado previamente por el middleware
        const id = req.id;

        //consulta el producto correspondiente en la base de datos
        const product =
            await ProductModel.getProductById(id);

        //devuelve el producto encontrado
        res.status(200).json(product);

    } catch (error) {
        //si ocurre un error devuelve código 500 (Internal Server Error)
        res.status(500).json({
            error: error.message
        });

    }
};

//controlador utilizado por el dashboard administrador para obtener productos activos e inactivos

const getProductsAdmin = async (req, res) => {

    try {
        //obtiene todos los productos de la tabla
        const products =
            await ProductModel
                .getAllProductsAdmin();
        //devuelve el listado completo
        res.status(200)
            .json(products);

    } catch (error) {
        //si ocurre un error devuelve código 500 (Internal Server Error)
        res.status(500)
            .json({
                error: error.message
            });

    }

};

//controlador encargado de crear un nuevo producto
const createProduct = async (req, res) => {

    try {
        //envía los datos recibidos al modelo para ser almacenados en la base de datos
        await ProductModel.createProduct(
            req.body
        );
        //informa que el producto fue creado correctamente
        res.status(201).json({
            mensaje: "Producto creado"
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};

//controlador encargado de modificar un producto existente
const updateProduct = async (req, res) => {

    try {
        //obtiene el id validado por el middleware
        const id = req.id;
        //envía al modelo el id y los nuevos datos
        await ProductModel.updateProduct(
            id,
            req.body
        );
        //informa que el producto fue actualizado
        res.status(200).json({
            mensaje:
            "Producto actualizado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

//controlador encargado de realizar la baja lógica de un producto
const deleteProduct = async (req, res) => {

    try {
        //obtiene el id validado por el middleware
        const id = req.id;
        //cambia el estado del producto a inactivo
        await ProductModel.deactivateProduct(id);
        //informa que el producto fue desactivado
        res.status(200).json({
            mensaje: "Producto desactivado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

//controlador encargado de reactivar un producto
const activateProduct = async (req, res) => {

    try {

        const id = req.id;
        //cambia el estado del producto a activo
        await ProductModel.activateProduct(
            id
        );

        res.status(200).json({
            mensaje:
            "Producto activado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

//exporta todos los controladores para que puedan ser utilizados en las rutas
export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    activateProduct,
    getProductsAdmin
};