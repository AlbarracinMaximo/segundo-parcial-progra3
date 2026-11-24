//este archivo permite editar un producto existente

// Verificamos que el administrador haya iniciado sesion antes de ingresar al panel
if (!sessionStorage.getItem("adminUsuario")) {
    window.location.href = "/login";
}

//obtiene el id del producto seleccionado previamente y almacenado temporalmente en sessionStorage
const idProducto =
    sessionStorage.getItem(
        "productoEditar"
    );

//sessionStorage permite guardar datos temporalmente mientras la pestaña permanezca abierta
//en este caso se utiliza para recordar qué producto debe ser editado

//obtiene el formulario de edición desde el HTML    
const form =
    document.getElementById(
        "editForm"
    );

//función encargada de obtener los datos actuales del producto desde la base de datos
async function cargarProducto() {

    try {
        //fetch realiza una petición HTTP al backend: se utiliza para solicitar la información del producto que será editado
        const response =
            await fetch(
                `http://localhost:3000/api/productos/${idProducto}`
            );
        //convierte la respuesta recibida en un objeto JavaScript
        const producto =
            await response.json();

            //getElementById permite obtener elementos HTML para modificar sus valores
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
    
    //muestra errores en la consola para depuración
    } catch(error){

        console.error(error);

    }

}

//agrega un evento submit al formulario
//submit se ejecuta cuando el usuario presiona el botón Guardar Cambios
form.addEventListener(
    "submit",
    async event => {
        //evita que el formulario recargue la página
        event.preventDefault();

        //crea un objeto con los nuevos datos ingresados por el administrador
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
                //Number convierte el texto ingresado por el usuario en un valor numérico antes de enviarlo al backend
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
                        //indica al servidor que la información enviada está en formato JSON
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    //JSON.stringify convierte el objeto JavaScript en una cadena JSON para poder enviarla en el cuerpo de la petición HTTP
                        JSON.stringify(
                            productoActualizado
                        )
                }

            );

            alert(
                //muestra una notificación al usuario confirmando que la actualización fue exitosa
                "Producto actualizado"
            );

            window.location.href =
                "/dashboard";

        } catch(error){

            console.error(error);

        }

    }
);
//ejecuta la función al cargar la página para mostrar automáticamente los datos actuales del producto seleccionado
cargarProducto();