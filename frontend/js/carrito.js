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