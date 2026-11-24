const validateId = (req, res, next) => {

    const id =
        Number(req.params.id);

    if (
        !Number.isInteger(id)
        || id <= 0
    ) {

        return res.status(400).json({
            mensaje:
            "Id inválido"
        });

    }

    req.id = id;

    next();

};

const validateProduct = (req, res, next) => {

    const errores = [];

    const {
        nombre,
        precio,
        stock
    } = req.body;

    if (!nombre) {

        errores.push(
            "Nombre obligatorio"
        );

    }

    if (!precio || precio <= 0) {

        errores.push(
            "Precio inválido"
        );

    }

    if (
        stock === undefined
        || stock < 0
    ) {

        errores.push(
            "Stock inválido"
        );

    }

    if (errores.length > 0) {

        return res.status(400).json({
            errores
        });

    }

    next();

};

export {
    validateId,
    validateProduct
};