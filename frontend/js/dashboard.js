const productosBody =
    document.getElementById(
        "productosBody"
    );

    

async function cargarProductos() {

    const response =
        await fetch(
            "http://localhost:3000/api/productos/admin/todos"
        );

    const productos =
        await response.json();

    const activos =
        productos.filter(
            producto =>
                producto.estado === 1
        );

    const inactivos =
        productos.filter(
            producto =>
                producto.estado === 0
        );

    document.getElementById(
        "cantidadProductos"
    ).textContent =
        `Activos: ${activos.length} | Inactivos: ${inactivos.length}`;

    productosBody.innerHTML = "";

    productos.forEach(producto => {

        productosBody.innerHTML += `
            <tr>

                <td>
                    ${producto.id_producto}
                </td>

                <td>
                    ${producto.nombre}
                </td>

                <td>
                    $${producto.precio}
                </td>

                <td>
                    ${producto.stock}
                </td>

                <td>
                    ${
                        producto.estado === 1
                        ? "Activo"
                        : "Inactivo"
                    }
                </td>

            <td>

            <button
                class="btn-editar"
                onclick="editarProducto(${producto.id_producto})"
            >
                Editar
            </button>

            ${
                producto.estado === 1

                ? `
                    <button
                        class="btn-desactivar"
                        onclick="desactivarProducto(${producto.id_producto})"
                    >
                        Desactivar
                    </button>
                `

                : `
                    <button
                        class="btn-activar"
                        onclick="activarProducto(${producto.id_producto})"
                    >
                        Activar
                    </button>
                `
            }

            </td>
            </tr>
        `;

    });

}

window.desactivarProducto =
async function(id) {

    await fetch(
        `http://localhost:3000/api/productos/${id}`,
        {
            method: "DELETE"
        }
    );

    cargarProductos();

};

window.activarProducto =
async function(id){

    await fetch(
        `http://localhost:3000/api/productos/activar/${id}`,
        {
            method: "PUT"
        }
    );

    cargarProductos();

};

window.editarProducto = function(id){

    sessionStorage.setItem(
        "productoEditar",
        id
    );

    window.location.href =
        "editar-producto.html";

};

cargarProductos();