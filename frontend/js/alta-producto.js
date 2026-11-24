// Gestiona el formulario de alta de nuevos productos y envia los datos al backend mediante POST /api/productos

// Verificamos que el administrador haya iniciado sesion antes de ingresar al panel
if (!sessionStorage.getItem("adminUsuario")) {
    window.location.href = "/login";
}

/*==================================
    Referencias al DOM y Config
==================================*/

const altaForm = document.getElementById("altaForm");
const altaError = document.getElementById("altaError");
// URL del endpoint de productos creado en el backend
const API_URL = "http://localhost:3000/api/productos";

/*========================================
    Envio del formulario de alta
========================================*/
// Usamos async porque adentro vamos a esperar la respuesta del servidor con await fetch
altaForm.addEventListener("submit", async (event) => {
    // Evitamos que el formulario recargue la pagina por defecto
    event.preventDefault();
    // Limpiamos posibles mensajes de error previos
    altaError.style.display = "none";
    altaError.textContent = "";

    // Armamos el objeto con los mismos nombres de campos que espera ProductModel.createProduct en el backend
    const nuevoProducto = {
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        // Number() convierte el texto del input en numero antes de enviarlo al backend
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        imagen: document.getElementById("imagen").value.trim(),
        categoria: document.getElementById("categoria").value,
        especie: document.getElementById("especie").value,
        edad: document.getElementById("edad").value
    };

    try {
        // Enviamos una peticion HTTP POST con el nuevo producto en formato JSON
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                // Le avisamos al servidor que el cuerpo viaja en formato JSON
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        // Parseamos la respuesta JSON del servidor
        const data = await response.json();

        // Si el middleware validateProduct o el servidor devolvio un error (400 o 500), lo mostramos
        if (!response.ok) {
            const mensajeError = data.errores ? data.errores.join(" - ") : (data.error || "Error al crear el producto");
            throw new Error(mensajeError);
        }

        alert("Producto agregado correctamente");
        // Redirigimos al dashboard donde ya va a aparecer el nuevo producto listado
        window.location.href = "/dashboard";

    } catch (error) {
        altaError.textContent = error.message;
        altaError.style.display = "block";
    }
});