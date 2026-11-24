//este archivo administra la pantalla de bienvenida

//su función es capturar el nombre ingresado por el cliente, almacenarlo temporalmente y redirigirlo al catálogo de productos

//getElementById permite localizar elementos HTML mediante su identificador único (id)
//busca en el documento HTML un elemento cuyo identificador sea welcomeForm y lo guarda en una constante, para poder manipularlo desde js
const form =
    document.getElementById("welcomeForm");

//addEventListener permite asociar una función a un evento generado por el usuario
//submit se ejecuta cuando el usuario envía el formulario
form.addEventListener("submit", (event) => {

    //cancela el comportamiento predeterminado del form (recargar pagina)
    event.preventDefault();

    //busca el valor ingresado en el input de la web y lo guarda en la constante
    const nombre =
        document.getElementById("nombreCliente").value;

    //almacena termporalmente informacion de la web, mientras este abierta la pestaña los datos estan disponibles
    sessionStorage.setItem(
        "nombreCliente",
        nombre
    );

    //redireccion a otra pagina
    window.location.href =
        "productos.html";
});