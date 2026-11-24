const idProducto =
    sessionStorage.getItem(
        "productoEditar"
    );

const form =
    document.getElementById(
        "editForm"
    );

async function cargarProducto() {

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/productos/${idProducto}`
            );

        const producto =
            await response.json();

            document.getElementById(
                "nombre"
            ).value =
                producto.nombre;

            document.getElementById(
                "descripcion"
            ).value =
                producto.descripcion;

            document.getElementById(
                "precio"
            ).value =
                producto.precio;

            document.getElementById(
                "stock"
            ).value =
                producto.stock;

            document.getElementById(
                "imagen"
            ).value =
                producto.imagen;

            document.getElementById(
                "categoria"
            ).value =
                producto.categoria;

            document.getElementById(
                "especie"
            ).value =
                producto.especie;

            document.getElementById(
                "edad"
            ).value =
                producto.edad;

    } catch(error){

        console.error(error);

    }

}

form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const productoActualizado = {

            nombre:
                document.getElementById(
                    "nombre"
                ).value,

            descripcion:
                document.getElementById(
                    "descripcion"
                ).value,

            precio:
                Number(
                    document.getElementById(
                        "precio"
                    ).value
                ),

            stock:
                Number(
                    document.getElementById(
                        "stock"
                    ).value
                ),

            imagen:
                document.getElementById(
                    "imagen"
                ).value,

            categoria:
                document.getElementById(
                    "categoria"
                ).value,

            especie:
                document.getElementById(
                    "especie"
                ).value,

            edad:
                document.getElementById(
                    "edad"
                ).value

        };

        try {


            await fetch(

                `http://localhost:3000/api/productos/${idProducto}`,

                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body:
                        JSON.stringify(
                            productoActualizado
                        )
                }

            );

            alert(
                "Producto actualizado"
            );

            window.location.href =
                "dashboard.html";

        } catch(error){

            console.error(error);

        }

    }
);

cargarProducto();