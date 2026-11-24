// Este archivo maneja todas las consultas SQL relacionadas con las tablas ventas y detalle_venta
// Importamos el pool de conexion a MySQL
import connection from "../database/db.js";

// Objeto que agrupa las operaciones de base de datos para ventas
const VentasModel = {
    // 1. Inserta el registro principal en la tabla ventas
    // NOW() es una funcion de MySQL que guarda automaticamente la fecha y hora actual
    async insertVenta(nombre_cliente, total) {
        // Los placeholders "?" evitan ataques de inyeccion SQL
        const [result] = await connection.query(
            "INSERT INTO ventas (nombre_cliente, fecha, total) VALUES (?, NOW(), ?)",
            [nombre_cliente, total]
        );

        return result;
    },
        
        // 2. Inserta cada producto comprado en la tabla intermedia detalle_venta (relacion muchos a muchos)
        async insertDetalleVenta(id_venta, id_producto, cantidad, precio_unitario) {
            const [result] = await connection.query(
                "INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
                [id_venta, id_producto, cantidad, precio_unitario]
        );

        return result;
    },

    // 3. Obtiene todas las ventas ordenadas de la mas reciente a la mas antigua
    async getAllVentas() {
        const [rows] = await connection.query(
            "SELECT * FROM ventas ORDER BY fecha DESC"
        );
        return rows;
    },

    // 4. Obtiene los productos asociados a una venta puntual usando JOIN con la tabla productos
    async getDetallesByVentaId(id_venta) {
        const [rows] = await connection.query(
            `SELECT dv.id_detalle, dv.id_producto, p.nombre, dv.cantidad, dv.precio_unitario
             FROM detalle_venta dv
             JOIN productos p ON dv.id_producto = p.id_producto
             WHERE dv.id_venta = ?`,
            [id_venta]
        );

        return rows;
    }
};

// Exportamos el modelo para usarlo desde ventas.controllers.js
export default VentasModel;

