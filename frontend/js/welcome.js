//gestiona las interacciones con la página de welcome, sobretodo capturar el nombre ingresado por el cliente almacenandolo temporalmente

//busca en el documento HTML un elemento cuyo identificador sea welcomeForm y lo guarda en una constante, para poder manipularlo desde js
const form =
    document.getElementById("welcomeForm");

//agrega un evento al formulario, submit se ejecuta cuando el usuario presiona el boton de enviar
form.addEventListener("submit", (event) => {

    //cancela el comportamiento predeterminado del form
    event.preventDefault();

    //busca el valor ingresao en el input de la web y lo guarda en la constante
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