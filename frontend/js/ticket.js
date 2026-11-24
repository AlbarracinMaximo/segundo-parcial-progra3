// Gestiona la pantalla del ticket: muestra el resumen de la compra, descarga el PDF con jsPDF y reinicia el autoservicio
/*==================================
    Referencias al DOM
==================================*/
const ticketId = document.getElementById("ticketId");
const ticketCliente = document.getElementById("ticketCliente");
const ticketFecha = document.getElementById("ticketFecha");
const ticketProductos = document.getElementById("ticketProductos");
const ticketTotal = document.getElementById("ticketTotal");
const btnDescargarPdf = document.getElementById("btnDescargarPdf");
const btnSalir = document.getElementById("btnSalir");

/*========================================
    Carga de datos del ticket
========================================*/
// Recuperamos el ticket guardado en sessionStorage al confirmar la compra en carrito.js
const ticket = JSON.parse(sessionStorage.getItem("ultimoTicket"));

// Si alguien entra directo a ticket.html sin haber comprado, lo devolvemos al inicio
if (!ticket) {
    window.location.href = "index.html";
} else {
    ticketId.textContent = `#${ticket.id_venta}`;
    ticketCliente.textContent = ticket.nombre_cliente;
    ticketFecha.textContent = ticket.fecha;
    ticketTotal.textContent = Number(ticket.total).toFixed(2);
    // Recorremos los productos comprados y armamos cada linea del comprobante
    let html = "";
    ticket.productos.forEach((prod) => {
        const subtotal = Number(prod.precio) * prod.cantidad;
        html += `
            <div class="ticket-item">
                <span>${prod.nombre} (x${prod.cantidad})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
        `;
    });
    ticketProductos.innerHTML = html;
}

/*========================================
    Descarga del ticket en PDF (jsPDF)
========================================*/
btnDescargarPdf.addEventListener("click", () => {
    // Extraemos jsPDF del objeto global window.jspdf que cargo el script CDN en ticket.html
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Coordenada vertical "y" para ir bajando linea por linea en la hoja del PDF
    let y = 20;
    doc.setFontSize(18);
    doc.text("Patitas PetShop - Ticket de Compra", 20, y);
    y += 12;
    doc.setFontSize(12);
    doc.text(`Venta N°: #${ticket.id_venta}`, 20, y);
    y += 8;
    doc.text(`Cliente: ${ticket.nombre_cliente}`, 20, y);
    y += 8;
    doc.text(`Fecha: ${ticket.fecha}`, 20, y);
    y += 12;
    doc.text("Productos comprados:", 20, y);
    y += 8;

    // Escribimos cada producto comprado dentro del documento PDF
    ticket.productos.forEach((prod) => {
        const subtotal = (Number(prod.precio) * prod.cantidad).toFixed(2);
        doc.text(`- ${prod.nombre} x${prod.cantidad}  ($${subtotal})`, 25, y);
        y += 8;
    });

    y += 6;
    doc.setFontSize(14);
    doc.text(`TOTAL: $${Number(ticket.total).toFixed(2)}`, 20, y);
    // Descarga automaticamente el archivo PDF en el navegador
    doc.save(`ticket-petshop-${ticket.id_venta}.pdf`);
});

/*========================================
    Reinicio del sistema (Autoservicio)
========================================*/
// Limpia todo el sessionStorage (cliente, carrito y ticket) y vuelve a la pantalla de bienvenida
btnSalir.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
});
