const contenedor =
    document.getElementById(
        "contenedorProductos"
    );

const filtroCategoria =
document.getElementById(
    "filtroCategoria"
);

const filtroEspecie =
document.getElementById(
    "filtroEspecie"
);

const clienteNombre =
    document.getElementById(
        "clienteNombre"
    );

const nombre =
    sessionStorage.getItem(
        "nombreCliente"
    );

clienteNombre.textContent =
    `Cliente: ${nombre}`;


function mostrarProductos(listaProductos) {
    contenedor.innerHTML = "";

    const inicio =
        (paginaActual - 1) *
        productosPorPagina;

    const fin =
        inicio + productosPorPagina;

    const productosPagina =
        listaProductos.slice(
            inicio,
            fin
        );

    productosPagina.forEach(producto => {

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
                    Categoría: ${producto.categoria}
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

let productos = [];

let paginaActual = 1;

const productosPorPagina = 5;

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

function agregarCarrito(idProducto) {

    let carrito =
        JSON.parse(
            sessionStorage.getItem("carrito")
        ) || [];

    const producto =
        productos.find(
            p => p.id_producto === idProducto
        );

    carrito.push(producto);

    sessionStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto agregado al carrito");

}

function aplicarFiltros() {

    let productosFiltrados =
        productos;

    const categoria =
        filtroCategoria.value;

    const especie =
        filtroEspecie.value;

    if (categoria !== "") {

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

window.cambiarPagina = function(numeroPagina){

    paginaActual = numeroPagina;

    aplicarFiltros();

};

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

cargarProductos();