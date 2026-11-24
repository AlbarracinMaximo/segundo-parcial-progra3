//este archivo administra la pantalla de productos

//se encarga de obtener los productos desde el backend, aplicar filtros, generar la paginación y gestionar el carrito de compras

const contenedor =
    document.getElementById(
        "contenedorProductos"
    );

//obtiene el selector de categorías
const filtroCategoria =
document.getElementById(
    "filtroCategoria"
);

//obtiene el selector de especies
const filtroEspecie =
document.getElementById(
    "filtroEspecie"
);

//obtiene el elemento donde se mostrará el nombre del cliente
const clienteNombre =
    document.getElementById(
        "clienteNombre"
    );

//recupera el nombre almacenado temporalmente durante la pantalla de bienvenida
const nombre =
    sessionStorage.getItem(
        "nombreCliente"
    );

clienteNombre.textContent =
    `Cliente: ${nombre}`;

//genera dinámicamente las tarjetas de productos que se mostrarán al usuario
function mostrarProductos(listaProductos) {
    //elimina el contenido anterior antes de volver a generar las tarjetas
    contenedor.innerHTML = "";

    //calcula la posición inicial del bloque de productos que se mostrará
    const inicio =
        (paginaActual - 1) *
        productosPorPagina;

    //calcula la posición final
    const fin =
        inicio + productosPorPagina;

    //slice permite obtener sólo una parte del arreglo completo
    //slice no modifica el arreglo original, se utiliza para implementar la paginación, mostrando únicamente los productos, correspondientes a la página actual
    const productosPagina =
        listaProductos.slice(
            inicio,
            fin
        );

    //forEach recorre todos los productos obtenidos para generar una tarjeta HTML por cada uno
    productosPagina.forEach(producto => {

        //las comillas invertidas permiten utilizar template literals, estos facilitan construir bloques HTML dinámicos incorporando variables
        //mediante sintaxis ${}
        contenedor.innerHTML += `
            <div class="card-producto">

                <img
                    src="./assets/images/${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.descripcion}
                </p>

                <p>
                    $${producto.precio}
                </p>

                <p>
                    Categoria: ${producto.categoria}
                </p>

                <button
                    onclick="agregarCarrito(${producto.id_producto})"
                >
                    Agregar al carrito
                </button>

            </div>
        `;

    });

}

//almacena todos los productos obtenidos desde el backend
let productos = [];

//indica la página actualmente mostrada
let paginaActual = 1;

//cantidad de productos visibles por página
const productosPorPagina = 5;

//obtiene los productos desde el backend
async function cargarProductos() {

    try {

        const response =
            await fetch(
                "http://localhost:3000/api/productos"
            );

        productos =
            await response.json();

        mostrarProductos(productos);
        
        crearPaginacion(productos);

    } catch (error) {

        console.error(
            "Error cargando productos:",
            error
        );

    }

}

//agrega un producto al carrito de compras
function agregarCarrito(idProducto) {

    //obtiene el carrito almacenado previamente
    let carrito =
        JSON.parse(
            sessionStorage.getItem("carrito")
        ) || [];

    //find busca y devuelve el primer elemento que cumple la condición indicada
    const producto =
        productos.find(
            p => p.id_producto === idProducto
        );

    //push agrega un nuevo elemento al final del arreglo carrito
    carrito.push(producto);

    //JSON.stringify convierte el arreglo en texto JSON para almacenarlo
    sessionStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto agregado al carrito");

}

//filtra productos según la categoría y especie seleccionadas por el usuario
function aplicarFiltros() {

    let productosFiltrados =
        productos;

    const categoria =
        filtroCategoria.value;

    const especie =
        filtroEspecie.value;

    if (categoria !== "") {

        //filter recorre el arreglo y devuelve únicamente los elementos que cumplen la condición indicada
        productosFiltrados =
            productosFiltrados.filter(
                producto =>
                    producto.categoria === categoria
            );

    }

    if (especie !== "") {

        productosFiltrados =
            productosFiltrados.filter(
                producto =>
                    producto.especie === especie
            );

    }

    mostrarProductos(
        productosFiltrados
    );

    //genera dinámicamente los botones de navegación entre páginas
    crearPaginacion(
        productosFiltrados
    );

}


function crearPaginacion(listaProductos){

    const paginacion =
        document.getElementById(
            "paginacion"
        );

    paginacion.innerHTML = "";

    const totalPaginas =
    //Math.ceil redondea hacia arriba, esto permite calcular correctamente la cantidad de páginas necesarias para mostrar todos los productos
        Math.ceil(
            listaProductos.length /
            productosPorPagina
        );

    for(
        let i = 1;
        i <= totalPaginas;
        i++
    ){

        paginacion.innerHTML += `
            <button
                onclick="cambiarPagina(${i})"
            >
                ${i}
            </button>
        `;

    }

}

//window permite exponer la función de forma global para que pueda ser llamada desde el atributo onclick de los botones HTML
window.cambiarPagina = function(numeroPagina){

    paginaActual = numeroPagina;

    aplicarFiltros();

};

//change se ejecuta cuando el usuario selecciona una opción diferente del filtro
filtroCategoria.addEventListener(
    "change",
    () => {
        paginaActual = 1;
        aplicarFiltros();
    }
);

filtroEspecie.addEventListener(
    "change",
    () => {
        paginaActual = 1;
        aplicarFiltros();
    }
);

//ejecuta la carga inicial de productos cuando se abre la página
cargarProductos();