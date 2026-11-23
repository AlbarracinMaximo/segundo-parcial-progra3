import connection from "../database/db.js";

const ProductModel = {
    async getAllProducts() {
        const [rows] = await connection.query(
            "SELECT * FROM productos WHERE estado = 1"
        );
        return rows;
    },

    async getProductById(id) {
        const [rows] = await connection.query(
            "SELECT * FROM productos WHERE id_producto = ?",
            [id]
        );

        return rows[0];
    }
};

export default ProductModel;