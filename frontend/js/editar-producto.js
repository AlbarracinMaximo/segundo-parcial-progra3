const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    params.get("id");

async function cargarProducto() {

    const response =
        await fetch(
            `http://localhost:3000/api/productos/${id}`
        );

    const producto =
        await response.json();

    document.getElementById(
        "nombre"
    ).value =
        producto.nombre;

    document.getElementById(
        "precio"
    ).value =
        producto.precio;

    document.getElementById(
        "stock"
    ).value =
        producto.stock;

}

cargarProducto();