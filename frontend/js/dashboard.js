//este archivo administra el dashboard del administrador, mostrando productos y permitiendo editarlos, desactivarlos o reactivarlos

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

//realiza la baja lógica de un producto
window.desactivarProducto =
async function(id) {

    //envía una petición DELETE al backend (si bien DELETE es para eliminar recursos, la programamos para que haga una baja logica, no fisica)
    await fetch(
        `http://localhost:3000/api/productos/${id}`,
        {
            method: "DELETE"
        }
    );
    //recarga la tabla con la información actualizada
    cargarProductos();

};

// Window representa la ventana actual del navegador(es el objeto global del navegador), se utiliza para exponer la función de manera global y permitir que pueda ser invocada desde los botones HTML

//reactiva un producto 
window.activarProducto =
async function(id){
    //envía una petición PUT al backend (para modificar el recurso de estado, de inactivo a activo)
    await fetch(
        `http://localhost:3000/api/productos/activar/${id}`,
        {
            method: "PUT"
        }
    );
    //actualiza el contenido de la tabla
    cargarProductos();

};

//guarda el id del producto seleccionado y redirecciona a la pantalla de edición
window.editarProducto = function(id){

    //sessionStorage permite almacenar datos temporalmente, mientras la pestaña continúe abierta

    //en este caso se guarda el id del producto que será editado en la siguiente pantalla
    sessionStorage.setItem(
        "productoEditar",
        id
    );

    window.location.href =
        "editar-producto.html";

};

cargarProductos();