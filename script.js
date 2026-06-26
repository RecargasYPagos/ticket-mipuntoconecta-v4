const CONFIG = {
    negocio: "Mi Punto Conecta",
    direccion: "Calle Emiliano Zapata S/N\nTriunfo Agrarista\nOsumacinta, Chiapas",
    terminal: "MPC-001",
    comisionRecarga: 5,
    pin: "1234"
};

const formulario = document.getElementById("contenedorFormulario");
const ticket = document.getElementById("ticket");

function generarFolio() {

    const hoy = new Date();

    const fecha =
        hoy.getFullYear() +
        String(hoy.getMonth() + 1).padStart(2, "0") +
        String(hoy.getDate()).padStart(2, "0");

    let consecutivo = localStorage.getItem("folio") || 0;

    consecutivo++;

    localStorage.setItem("folio", consecutivo);

    return "MPC-" + fecha + "-" + String(consecutivo).padStart(3, "0");

}

const btnRecargas = document.getElementById("btnRecargas");
const btnDepositos = document.getElementById("btnDepositos");
const btnRetiros = document.getElementById("btnRetiros");
const btnServicios = document.getElementById("btnServicios");

btnRecargas.onclick = function () {
    mostrarFormularioRecarga();
};

btnDepositos.onclick = function () {
    mostrarFormularioDeposito();
};

btnRetiros.onclick = function () {
    alert("Módulo Retiros (Próximamente)");
};

btnServicios.onclick = function () {
    alert("Módulo Pago de Servicios (Próximamente)");
};

function mostrarFormularioDeposito() {

    let folio = generarFolio();

    formulario.innerHTML = `

    <h2>💰 Depósito en efectivo</h2>

    <label>Banco destino</label>

    <select id="banco">
        <option>BBVA</option>
        <option>Banamex</option>
        <option>Banorte</option>
        <option>Santander</option>
        <option>Banco Azteca</option>
        <option>Banco del Bienestar</option>
        <option>HSBC</option>
        <option>Scotiabank</option>
        <option>Inbursa</option>
        <option>BanCoppel</option>
    </select>

    <label>Titular</label>
    <input id="titular">

    <label>Número de cuenta o tarjeta</label>
    <input id="cuenta">

    <label>Monto</label>
    <input type="number" id="monto">

    <label>Comisión</label>
    <input type="number" id="comision">

    <label>Horario</label>
    <input id="horario" placeholder="09:00 - 21:00">

    <label>Folio</label>
    <input id="folioDeposito" value="${folio}">

    <button id="generarDeposito">
        Generar Ticket
    </button>

    `;

    document
        .getElementById("generarDeposito")
        .onclick = function () {

        alert("En el siguiente paso generaremos el ticket.");

    };

}
