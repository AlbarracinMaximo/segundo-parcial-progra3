const loginForm = document.getElementById("loginForm");
const inputUsuario = document.getElementById("usuario");
const inputPassword = document.getElementById("password");
const btnAccesoRapido = document.getElementById("btnAccesoRapido");
const loginError = document.getElementById("loginError");

// URL base de la API del backend
const API_URL = "http://localhost:3000";

// Boton acceso rapido
btnAccesoRapido.addEventListener("click", () => {
    inputUsuario.value = "admin1";
    inputPassword.value = "admin123";
    loginError.style.display = "none";
});

// Manejo del envio del formulario de login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = inputUsuario.value.trim();
    const password = inputPassword.value.trim();

    loginError.style.display = "none";
    loginError.textContent = "";

    try {
        const response = await fetch(`${API_URL}/api/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al iniciar sesión");
        }

        // Guardamos la sesion del administrador
        sessionStorage.setItem("adminUsuario", JSON.stringify(data.usuario));

        alert(`¡Bienvenido/a ${data.usuario.usuario}!`);
        // Redirige al dashboard del administrador
        window.location.href = "dashboard.html";

    } catch (error) {
        loginError.textContent = error.message;
        loginError.style.display = "block";
    }
});
