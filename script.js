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
