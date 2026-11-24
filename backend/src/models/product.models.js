//importa la conexión a la base de datos previamente configurada
import connection from "../database/db.js";

//objeto que agrupa todas las operaciones relacionadas con la tabla productos
const ProductModel = {

    //obtiene todos los productos activos (estado = 1)
    async getAllProducts() {
        const [rows] = await connection.query(
            "SELECT * FROM productos WHERE estado = 1"
        );
        return rows;
    },

    //obtiene un producto específico según su id
    async getProductById(id) {
        const [rows] = await connection.query(
            "SELECT * FROM productos WHERE id_producto = ?",
            [id]
        );

        //devuelve únicamente el primer resultado encontrado
        return rows[0];
    },

    //obtiene todos los productos para el dashboard administrador, tanto activos como inactivos
    async getAllProductsAdmin() {

        const [rows] =
            await connection.query(
                "SELECT * FROM productos"
            );

        return rows;

    },

    //crea un nuevo producto en la base de datos
    async createProduct(producto) {
    //extrae los datos recibidos del controlador
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

    //ejecuta un INSERT para almacenar el nuevo producto
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
    //devuelve información sobre la operación realizada
    return result;
},

//actualiza los datos de un producto existente
async updateProduct(id, producto) {
    //extrae los nuevos valores recibidos
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

    //ejecuta un UPDATE utilizando el id recibido
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

//realiza una baja LOGICA del producto (no lo elimina completamente de la bd, solo lo inactiva)
async deactivateProduct(id) {

//cambia el estado del producto a inactivo (estado = 0)
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

//reactiva un producto
async activateProduct(id) {
    //cambia el estado del producto a activo (estado = 1)
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

//exporta el modelo para que pueda ser utilizado por los controladores
export default ProductModel;

// los ? en las consultas SQL son placeholders, estos permiten enviar parámetros de forma segura, y ayudan a prevenir ataques de inyeccion 
// sql (no permiten concatenar valores dentro de la consulta sql)