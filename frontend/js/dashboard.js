//este archivo administra el dashboard del administrador, mostrando productos y permitiendo editarlos, desactivarlos o reactivarlos

// Verificamos que el administrador haya iniciado sesion antes de ingresar al panel
if (!sessionStorage.getItem("adminUsuario")) {
    window.location.href = "/login";
}

//obtiene el cuerpo de la tabla donde se cargarán los productos
//getElementById permite buscar elementos del HTML utilizando su atributo id para poder modificar su contenido
const productosBody =
    document.getElementById(
        "productosBody"
    );

//async indica que la función realizará operaciones asíncronas que pueden tardar en completarse, esto permite utilizar await dentro de la función    

//await detiene temporalmente la ejecución hasta recibir la respuesta del servidor, evita trabajar con datos incompletos

//función encargada de obtener y mostrar los productos
async function cargarProductos() {

    try{
        //fetch permite realizar peticiones HTTP a una API REST (intermediario que recibe consultas simples y trae el resultado)
        //en este caso se utiliza para solicitar al backend el listado completo de productos
        const response =
            await fetch(
                "http://localhost:3000/api/productos/admin/todos"
            );
        //convierte la respuesta recibida a un objeto js para que pueda ser utilizado (es decir formato JSON)
        const productos =
            await response.json();

        //filter recorre el arreglo y devuelve únicamente los elementos que cumplen una condición
        //en este caso se utiliza para obtener los productos activos o inactivos de forma separada
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
        //muestra la cantidad de productos activos e inactivos
        document.getElementById(
            "cantidadProductos"

        //textContent permite modificar el texto visible de un elemento HTML, de esta manera puedo actualizar dinámicamente la info mostrada al usuario, 
        //sin necesidad de que el mismo recargue la página
        ).textContent =
            `Activos: ${activos.length} | Inactivos: ${inactivos.length}`;

        //limpia el contenido previo de la tabla
        productosBody.innerHTML = "";

        //recorre todos los productos recibidos
        productos.forEach(producto => {

            //genera dinámicamente una fila para cada producto

            //las comillas invertidas (`) permiten utilizar template literals
            //los template literals facilitan la creación de bloques HTML dinámicos incorporando variables mediante la sintaxis ${}            
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
                            //operador ternario: permite tomar una decisión en una sola línea
                            //En este caso: si estado es 1 muestra "Activo", caso contrario muestra "Inactivo"
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
                    //muestra diferentes botones según el estado del producto
                    //si está activo se muestra "Desactivar"
                    //si está inactivo se muestra "Activar"

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
    }catch(error){
    console.error(error);
}

}

const modal =
    document.getElementById(
        "modalConfirmacion"
    );

const btnConfirmar =
    document.getElementById(
        "btnConfirmar"
    );

const btnCancelar =
    document.getElementById(
        "btnCancelar"
    );

const mensajeModal =
    document.getElementById(
        "mensajeModal"
    );

let accionPendiente = null;

//realiza la baja lógica de un producto
window.desactivarProducto =function(id){
    // modal de confirmacion de la baja
    //no realiza la baja inmediatamente, sino que espera la confirmación del administrador
    mensajeModal.textContent =
        "¿Está seguro de desactivar este producto?";

    //muestra el modal en pantalla agregando la clase show (estaba oculto)
    modal.classList.add("show");

    //guarda la acción pendiente que se ejecutará únicamente si el usuario confirma
    accionPendiente = async () => {
    //envía una petición PUT al backend (para modificar el recurso de estado, de activo a inactivo)
        await fetch(
            `http://localhost:3000/api/productos/${id}`,
            {
                method: "DELETE"
            }
        );
        //oculta el modal una vez completada la operación
        modal.classList.remove("show");

        cargarProductos();
    };
};

// Window representa la ventana actual del navegador(es el objeto global del navegador), se utiliza para exponer la función de manera global y permitir que pueda ser invocada desde los botones HTML

//reactiva un producto 
window.activarProducto = function(id){
    // modal de confirmacion de la activacion
    //no realiza la activacion inmediatamente, sino que espera la confirmación del administrador
    mensajeModal.textContent =
        "¿Está seguro de activar este producto?";

    //muestra el modal al administrador
    modal.classList.add("show");

    //almacena la acción que será ejecutada luego de la confirmación
    accionPendiente = async () => {
    //envía una petición PUT al backend (para modificar el recurso de estado, de activo a inactivo)
        await fetch(
            `http://localhost:3000/api/productos/activar/${id}`,
            {
                method: "PUT"
            }
        );

        //cierra el modal luego de completar la activación
        modal.classList.remove("show");

        cargarProductos();
    };
};

//se ejecuta cuando el administrador presiona el botón Confirmar del modal
//si existe una acción pendiente, la ejecuta
btnConfirmar.addEventListener(
    "click",
    async () => {

        if (accionPendiente) {
            await accionPendiente();
        }
    }
);

//se ejecuta cuando el administrador presiona el botón Cancelar
//cierra el modal sin realizar ninguna modificación
btnCancelar.addEventListener(
    "click",
    () => {
        modal.classList.remove("show");
        accionPendiente = null;
    }
);

//guarda el id del producto seleccionado y redirecciona a la pantalla de edición
window.editarProducto = function(id){

    //sessionStorage permite almacenar datos temporalmente, mientras la pestaña continúe abierta

    //en este caso se guarda el id del producto que será editado en la siguiente pantalla
    sessionStorage.setItem(
        "productoEditar",
        id
    );

    window.location.href =
        "/dashboard/editar";

};

cargarProductos();