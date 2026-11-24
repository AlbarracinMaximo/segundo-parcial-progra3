//este archivo se encarga de mostrar los productos almacenados en el carrito y permitir eliminarlos

//obtiene el contenedor donde se mostrarán los productos del carrito
const contenedor =
document.getElementById(
    "contenedorCarrito"
);

//obtiene el elemento donde se mostrará el importe total de la compra
const totalHTML =
document.getElementById(
    "totalCarrito"
);

//recupera el carrito almacenado en sessionStorage

//JSON.parse convierte el texto almacenado en un arreglo de objetos JavaScript

//si no existe ningún carrito se utiliza un arreglo vacío

let carrito =
JSON.parse(
    sessionStorage.getItem("carrito")
) || [];

//almacena la suma total de los productos
let total = 0;

//recorre todos los productos del carrito y va acumulando el precio de cada uno para calcular el total
carrito.forEach((producto,index)=>{

    total += Number(producto.precio);
    //construye dinámicamente una tarjeta HTML para cada producto del carrito
    contenedor.innerHTML += `
        <div class="card-producto">

            <h3>
                ${producto.nombre}
            </h3>

            <p>
                $${producto.precio}
            </p>

            <button
                onclick="eliminarProducto(${index})"
            >
                Eliminar
            </button>

        </div>
    `;

});

//muestra el importe total del carrito
totalHTML.textContent =
`Total: $${total}`;


//elimina un producto del carrito según la posición recibida
function eliminarProducto(index){
    //elimina un elemento del arreglo carrito, a partir del indice indicado
    carrito.splice(index,1);

    //actualiza la información almacenada en sessionStorage
    sessionStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    //recarga la página para actualizar la vista
    location.reload();

}

/*================================================
    Modal de confirmacion y registro de compra
================================================*/
const btnFinalizar = document.getElementById("btnFinalizar");
const modalConfirmar = document.getElementById("modalConfirmar");
const btnCancelarModal = document.getElementById("btnCancelarModal");
const btnConfirmarModal = document.getElementById("btnConfirmarModal");
const carritoError = document.getElementById("carritoError");

const API_VENTAS_URL = "http://localhost:3000/api/ventas";

// Como productos.js agrega cada producto con push(), esta funcion agrupa los repetidos y calcula su cantidad
function agruparProductos(listaCarrito) {
    const agrupados = [];
    listaCarrito.forEach((prod) => {
        // Buscamos si este producto ya fue agregado al arreglo agrupados
        const existente = agrupados.find((item) => item.id_producto === prod.id_producto);
        if (existente) {
            existente.cantidad += 1;
        } else {
            agrupados.push({
                id_producto: prod.id_producto,
                nombre: prod.nombre,
                precio: Number(prod.precio),
                cantidad: 1
            });
        }
    });
    return agrupados;
}

// Al tocar "Finalizar Compra" validamos que el carrito no este vacio y abrimos el modal
btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agregá al menos un producto para comprar.");
        return;
    }
    carritoError.style.display = "none";
    modalConfirmar.style.display = "flex";
});

// Boton "Cancelar" dentro del modal: simplemente lo cierra
btnCancelarModal.addEventListener("click", () => {
    modalConfirmar.style.display = "none";
});

// Boton "Si, confirmar": manda la venta al backend (POST /api/ventas) y redirige al ticket

btnConfirmarModal.addEventListener("click", async () => {
    const nombreCliente = sessionStorage.getItem("nombreCliente") || "Cliente";
    const productosAgrupados = agruparProductos(carrito);

    // Armamos el objeto con los datos que espera el endpoint POST /api/ventas
    const datosVenta = {
        nombre_cliente: nombreCliente,
        total: total,
        productos: productosAgrupados
    };

    try {
        const response = await fetch(API_VENTAS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosVenta)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "No se pudo registrar la venta");
        }

        // Guardamos los datos del ticket en sessionStorage para mostrarlos en ticket.html
        const ticket = {
            id_venta: data.id_venta,
            nombre_cliente: nombreCliente,
            fecha: new Date().toLocaleString("es-AR"),
            total: total,
            productos: productosAgrupados
        };

        sessionStorage.setItem("ultimoTicket", JSON.stringify(ticket));
        // Vaciamos el carrito porque la compra ya fue confirmada
        sessionStorage.removeItem("carrito");

        // Redirigimos a la pantalla del ticket
        window.location.href = "ticket.html";

        } catch (error) {
        modalConfirmar.style.display = "none";
        carritoError.textContent = error.message || "Error de conexion con el servidor";
        carritoError.style.display = "block";
        }
    });