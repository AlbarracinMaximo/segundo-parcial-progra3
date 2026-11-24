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
    },

    async getAllProductsAdmin() {

        const [rows] =
            await connection.query(
                "SELECT * FROM productos"
            );

        return rows;

    },


    async createProduct(producto) {

    const {
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        categoria,
        especie,
        edad
    } = producto;

    const [result] =
        await connection.query(
            `
            INSERT INTO productos
            (
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                categoria,
                especie,
                edad
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                categoria,
                especie,
                edad
            ]
        );

    return result;
},

async updateProduct(id, producto) {

    const {
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        categoria,
        especie,
        edad
    } = producto;

    const [result] = await connection.query(
        `
        UPDATE productos
        SET
            nombre = ?,
            descripcion = ?,
            precio = ?,
            stock = ?,
            imagen = ?,
            categoria = ?,
            especie = ?,
            edad = ?
        WHERE id_producto = ?
        `,
        [
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            categoria,
            especie,
            edad,
            id
        ]
    );

    return result;
},

async deactivateProduct(id) {

    const [result] = await connection.query(
        `
        UPDATE productos
        SET estado = 0
        WHERE id_producto = ?
        `,
        [id]
    );

    return result;
},

async activateProduct(id) {

    const [result] =
        await connection.query(

            `
            UPDATE productos
            SET estado = 1
            WHERE id_producto = ?
            `,

            [id]

        );

    return result;

}

};





export default ProductModel;

