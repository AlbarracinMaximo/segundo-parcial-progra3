//este archivo contiene middlewares (intermediarios que conectan dos partes de un programa para que se puedan comunicar e intercambiar datos fácilmente) 
//utilizados para validar los datos recibidos antes de ejecutar los controladores

//middleware encargado de validar que el id recibido por parámetro sea un número entero positivo
const validateId = (req, res, next) => {

    //convierte el parámetro recibido en la URL a número
    const id =
        Number(req.params.id);
    //verifica que el valor sea un entero positivo
    if (
        !Number.isInteger(id)
        || id <= 0
    ) {
        //si el id es inválido devuelve un error 400 (Bad Request o «solicitud incorrecta»)
        return res.status(400).json({
            mensaje:
            "Id inválido"
        });

    }
    //guarda el id validado dentro de req para utilizarlo posteriormente en el controlador
    req.id = id;
    //permite continuar con la ejecución del siguiente middleware o del controlador correspondiente
    next();
};

//middleware encargado de validar los datos de un producto
const validateProduct = (req, res, next) => {
    //crea un arreglo para almacenar posibles errores
    const errores = [];
    //extrae los datos enviados en el body de la petición
    const {
        nombre,
        precio,
        stock
    } = req.body;
    //verifica que exista un nombre
    if (!nombre) {

        errores.push(
            "Nombre obligatorio"
        );

    }
    //verifica que el precio exista y sea mayor a cero
    if (!precio || precio <= 0) {

        errores.push(
            "Precio inválido"
        );

    }
    //verifica que el stock exista y no sea negativo
    if (
        stock === undefined
        || stock < 0
    ) {

        errores.push(
            "Stock inválido"
        );

    }
    //si el arreglo contiene errores devuelve una respuesta indicando los problemas encontrados
    if (errores.length > 0) {

        return res.status(400).json({
            errores
        });

    }
    //si las validaciones son correctas permite continuar con la ejecución del controlador
    next();

};

//exporta los middlewares para poder utilizarlos en las rutas
export {
    validateId,
    validateProduct
};