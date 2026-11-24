/*============================
    Controladores de vistas
============================*/
export const vistaLogin = (req, res) => {
    res.render("login", {
        title: "Login Administrador"
    });
};

export const vistaDashboard = (req, res) => {
    res.render("dashboard", {
        title: "Dashboard Administrador"
    });
};

export const vistaAltaProducto = (req, res) => {
    res.render("alta-producto", {
        title: "Nuevo Producto"
    });
};

export const vistaEditarProducto = (req, res) => {
    res.render("editar-producto", {
        title: "Editar Producto"
    });
};