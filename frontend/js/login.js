// Gestiona las interacciones de la pantalla de login del administrador: acceso rapido, envio de credenciales al backend y guardado temporal de la sesion

/*==================================
    Referencias al DOM y Config
==================================*/
// Buscamos los elementos en el documento HTML por su id y los guardamos en constantes para poder manipularlos desde JS
const loginForm = document.getElementById("loginForm");
const inputUsuario = document.getElementById("usuario");
const inputPassword = document.getElementById("password");
const btnAccesoRapido = document.getElementById("btnAccesoRapido");
const loginError = document.getElementById("loginError");

// URL base donde esta corriendo nuestra API del backend (Express)
const API_URL = "http://localhost:3000";


/*========================================
    Acceso rapido (Tester / Profesor)
========================================*/
// Al hacer click en el boton de acceso rapido, autocompletamos los inputs con un usuario administrador de prueba
btnAccesoRapido.addEventListener("click", () => {
    inputUsuario.value = "admin1";
    inputPassword.value = "admin123";
    // Ocultamos el cartel de error en caso de que hubiera quedado visible de un intento anterior
    loginError.style.display = "none";
});


/*========================================
    Envio del formulario de login
========================================*/
// Agregamos el evento submit al formulario (se ejecuta cuando el usuario presiona "Ingresar")
// Usamos async porque adentro vamos a hacer una peticion HTTP con fetch usando await
loginForm.addEventListener("submit", async (event) => {
    // Cancelamos el comportamiento predeterminado del formulario para que no recargue la pagina
    event.preventDefault();

    // Tomamos los valores ingresados en los inputs y con .trim() limpiamos espacios sobrantes al inicio y al final
    const usuario = inputUsuario.value.trim();
    const password = inputPassword.value.trim();

    // Limpiamos y ocultamos posibles mensajes de error anteriores antes de hacer la nueva peticion
    loginError.style.display = "none";
    loginError.textContent = "";

    try {
        // Hacemos una peticion HTTP POST al endpoint de login en nuestro backend
        const response = await fetch(`${API_URL}/api/admin/login`, {
            method: "POST",
            headers: {
                // Le avisamos al servidor que el cuerpo (body) de la peticion viaja en formato JSON
                "Content-Type": "application/json"
            },
            // JSON.stringify convierte el objeto JS { usuario, password } en una cadena de texto JSON para enviarlo por HTTP
            body: JSON.stringify({ usuario, password })
        });

        // Leemos el JSON dentro del cuerpo de la respuesta del servidor y lo convertimos a objeto JS (es asincrono, por eso lleva await)
        const data = await response.json();

        // Procesamos respuestas de error HTTP (como 400, 401 o 500), ya que fetch por si solo no entra al catch con esos codigos
        if (!response.ok) {
            // Lanzamos un Error con el mensaje que devolvio el backend para que lo capture el bloque catch de abajo
            throw new Error(data.error || "Error al iniciar sesión");
        }

        // Guardamos temporalmente los datos del administrador en sessionStorage (se mantienen mientras la pestaña siga abierta)
        // Usamos JSON.stringify porque sessionStorage solo permite guardar texto (strings)
        sessionStorage.setItem("adminUsuario", JSON.stringify(data.usuario));

        // Mostramos un saludo de bienvenida con el nombre de usuario devuelto por el servidor
        alert(`¡Bienvenido/a ${data.usuario.usuario}!`);

        // Redirigimos al panel de administracion (dashboard)
        window.location.href = "dashboard.html";

    } catch (error) {
        // Aca caen tanto los errores que lanzamos manualmente en !response.ok (400/401/500) como errores reales de red (si el servidor esta apagado)
        loginError.textContent = error.message;
        loginError.style.display = "block";
    }
});
