# segundo-parcial-progra3

# División de tareas


## Juliana Sciaini


### Frontend

- Pantalla de bienvenida (ingreso de nombre del cliente).
- Pantalla de productos. 
    - Listado de productos.
    - Filtros por categoría y especie.
    - Paginación de productos.
- Diseño responsive.
- Navegación general del cliente.
- Pantalla y lógica Carrito de compras.
- Dashboard administrador. 
    - Tabla/listado de productos.
    - Visualización de productos activos e inactivos.
    - Botones editar, activar y desactivar.
- Pantalla y lógica de edición de productos.

### Backend

- Modelo de productos.
- CRUD completo de productos.
- Endpoints: 
    - GET productos.
    - GET producto por ID.
    - POST producto.
    - PUT producto.
    - DELETE Baja lógica (activo/inactivo).
    - PUT Reactivación de productos.
- Validaciones de productos mediante middlewares.
- Controladores y rutas de productos.
- Integración entre frontend, backend y base de datos para la gestión de productos.

## Máximo Albarracín


### Frontend

- Desarrollo de la pantalla de login de administrador.
- Desarrollo del botón de acceso al panel de administración.
- Desarrollo del formulario de alta de productos.
- Desarrollo de la interfaz de carga de nuevos productos.
- Desarrollo de la pantalla de ticket o comprobante de compra.
- Implementación del modal de confirmación de compra.
- Desarrollo del proceso de finalización de compra.
- Implementación del reinicio del sistema después de completar una compra.
- Integración de las interfaces relacionadas con ventas y comprobantes.

### Backend

- Implementación de la autenticación de administradores.
- Desarrollo de la lógica de inicio de sesión.
- Gestión y validación de credenciales de usuarios administradores.
- Desarrollo del modelo de ventas.
- Registro de ventas en la base de datos.
- Relación entre ventas y productos vendidos.
- Generación de datos para comprobantes de compra.
- Implementación de exportación de ventas a Excel.
- Desarrollo del acceso rápido para pruebas y validación del sistema.


## Trabajo conjunto

- Diseño general de la aplicación.
- Diseño de la base de datos.
- Creación y revisión de tablas.
- Definición de relaciones entre entidades.
- Conexión entre frontend y backend.
- Pruebas funcionales del sistema.
- Corrección de errores.
- Ajustes de diseño y experiencia de usuario.
- Documentación técnica y funcional.
- Preparación de la entrega final.


# Arquitectura del proyecto

## Backend

### index.js
Archivo principal del servidor. Configura Express, registra los middlewares globales, vincula las rutas de la aplicación y pone en funcionamiento el servidor web.

### environments.js
Centraliza la configuración del proyecto. Obtiene las variables de entorno definidas en el archivo `.env`, incluyendo el puerto de ejecución y los datos de conexión a la base de datos.

### db.js
Configura y exporta la conexión a MySQL mediante un pool de conexiones reutilizable, utilizado por los modelos para ejecutar consultas SQL.

### admin.routes.js
Define las rutas relacionadas con la autenticación del administrador, incluyendo el proceso de inicio de sesión y validación de credenciales.

### product.routes.js
Define todas las rutas relacionadas con la gestión de productos y vincula cada endpoint con su controlador correspondiente.

### product.controllers.js
Contiene la lógica de negocio asociada a los productos. Actúa como intermediario entre las rutas y los modelos, procesando las solicitudes y construyendo las respuestas enviadas al cliente.

### product.models.js
Gestiona el acceso a la base de datos para las operaciones relacionadas con productos, incluyendo consultas, altas, modificaciones, activación y desactivación.

### product.middleware.js
Contiene middlewares de validación utilizados para verificar identificadores y datos de productos antes de ejecutar operaciones sobre la base de datos.

### ventas.routes.js
Define las rutas de la API para registrar nuevas ventas (`POST /api/ventas`) y consultar el listado de ventas registradas (`GET /api/ventas`).

### ventas.controllers.js
Valida los datos recibidos al confirmar una compra, coordina el guardado de la venta y su detalle de productos, y devuelve el comprobante en formato JSON.

### ventas.models.js
Ejecuta las consultas SQL sobre las tablas `ventas` y `detalle_venta` para persistir compras y consultar los productos asociados mediante `JOIN`.

## Frontend

### index.html
Pantalla principal de bienvenida. Permite al cliente ingresar su nombre antes de acceder al catálogo de productos.

### welcome.js
Gestiona la interacción de la pantalla de bienvenida, almacena temporalmente el nombre del cliente y redirige al catálogo.

### productos.html
Contiene la estructura visual del catálogo de productos, incluyendo filtros, contenedor de productos y paginación.

### productos.js
Obtiene los productos desde la API, genera dinámicamente las tarjetas de productos, administra los filtros, la paginación y la lógica de agregado al carrito.

### carrito.html
Estructura visual de la pantalla del carrito de compras.

### carrito.js
Gestiona los productos almacenados en el carrito, calcula el importe total y permite eliminar productos antes de finalizar la compra.

### login.html
Pantalla de autenticación de administradores del sistema.

### login.js
Gestiona el inicio de sesión de administradores mediante peticiones al backend, control de errores y almacenamiento temporal de la sesión.

### dashboard.html
Estructura de la pantalla de administración de productos. Contiene la tabla donde se muestran los productos y las acciones disponibles.

### dashboard.js
Obtiene los productos desde la API y genera dinámicamente el listado administrativo, permitiendo editar, activar y desactivar productos.

### editar-producto.html
Formulario utilizado para modificar la información de un producto existente.

### alta-producto.html
Formulario del panel de administrador utilizado para dar de alta un nuevo producto en el catálogo.

### alta-producto.js
Captura los datos del formulario de alta, los valida y los envía al backend mediante una petición `POST` a `/api/productos`.

### ticket.html
Pantalla final que muestra el comprobante de compra con los datos del cliente, fecha, productos adquiridos y total pagado.

### ticket.js
Recupera los datos de la venta desde `sessionStorage`, genera y descarga el comprobante en PDF mediante `jsPDF` y reinicia el sistema de autoservicio al salir.

### editar-producto.js
Obtiene los datos actuales de un producto, carga la información en el formulario y envía las modificaciones al backend mediante una petición PUT.

### styles.css
Hoja de estilos principal del sistema. Define la apariencia visual de todas las pantallas, incluyendo navegación, formularios, catálogo, carrito y dashboard.

---

## Archivos de configuración

### package.json
Archivo de configuración de Node.js. Define las dependencias utilizadas por el proyecto, scripts de ejecución y características generales de la aplicación.

### package-lock.json
Archivo generado automáticamente por npm que registra las versiones exactas de las dependencias instaladas para asegurar consistencia entre distintos entornos de ejecución.