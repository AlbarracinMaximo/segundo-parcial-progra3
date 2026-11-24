const contenedor =
document.getElementById(
    "contenedorCarrito"
);

const totalHTML =
document.getElementById(
    "totalCarrito"
);

let carrito =
JSON.parse(
    sessionStorage.getItem("carrito")
) || [];

let total = 0;

carrito.forEach((producto,index)=>{

    total += Number(producto.precio);

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

totalHTML.textContent =
`Total: $${total}`;

function eliminarProducto(index){

    carrito.splice(index,1);

    sessionStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    location.reload();

}