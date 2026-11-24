const productosBody =
    document.getElementById(
        "productosBody"
    );

    

async function cargarProductos() {

    const response =
        await fetch(
            "http://localhost:3000/api/productos"
        );

    const productos =
        await response.json();

    document.getElementById(
    "cantidadProductos"
    ).textContent =
        `Productos activos: ${productos.length}`;

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

                <button
                    class="btn-editar"
                >
                    Editar
                </button>

                <button
                    class="btn-desactivar"
                    onclick="desactivarProducto(${producto.id_producto})"
                >
                    Desactivar
                </button>

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

cargarProductos();