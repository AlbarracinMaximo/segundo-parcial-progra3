// Este archivo contiene los controladores de ventas: recibe las peticiones HTTP, valida los datos y llama al modelo
/*============================
    Controladores ventas
============================*/
import VentasModel from "../models/ventas.models.js";

/////////////////////////////////
// POST registrar una nueva venta
const createVenta = async (req, res) => {
    try {
        // Extraemos los datos enviados en JSON desde carrito.js (ya parseados por express.json())
        const { nombre_cliente, total, productos } = req.body;
        // Validamos que lleguen todos los campos obligatorios y que el carrito tenga al menos 1 producto
        if (!nombre_cliente || !total || !Array.isArray(productos) || productos.length === 0) {
            // 400 = Bad Request. Con return cortamos la ejecucion aca
            return res.status(400).json({
                error: "Faltan datos obligatorios para registrar la venta"
            });
        }

        // 1. Guardamos la venta principal en la tabla ventas
        const resultVenta = await VentasModel.insertVenta(nombre_cliente, total);

        // Tomamos el id_venta autogenerado que le asigno MySQL a esta compra
        const idVenta = resultVenta.insertId;

        // 2. Recorremos los productos comprados y guardamos cada uno en detalle_venta
        for (const prod of productos) {
            await VentasModel.insertDetalleVenta(
                idVenta,
                prod.id_producto,
                prod.cantidad,
                prod.precio
            );
        }

        // 201 = Created, devolvemos el id_venta para que ticket.html lo muestre en el comprobante
        res.status(201).json({
            mensaje: "Venta registrada con exito",
            id_venta: idVenta
        });

    } catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: error.message });
    }
};

/////////////////////////////////
// GET obtener listado de ventas con sus productos asociados
const getVentas = async (req, res) => {
    try {
        // Traemos todas las ventas registradas
        const ventas = await VentasModel.getAllVentas();

        // Por cada venta consultamos sus productos en detalle_venta
        const ventasConDetalle = [];
        for (const venta of ventas) {
            const productos = await VentasModel.getDetallesByVentaId(venta.id_venta);
            ventasConDetalle.push({
                ...venta,
                productos
            });
        }

        // 200 = OK, devolvemos las ventas con sus productos en formato JSON
        res.status(200).json(ventasConDetalle);

    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ error: error.message });
    }
};

export {
    createVenta,
    getVentas
};