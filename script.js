// ================================
// MI PUNTO CONECTA
// Script Principal
// ================================

const CONFIG = {

    negocio:"MI PUNTO CONECTA",

    direccion:"Calle Emiliano Zapata S/N\nTriunfo Agrarista\nOsumacinta, Chiapas",

    terminal:"MPC-001",

    comisionRecarga:5,

    pin:"1234"

};

const formulario=document.getElementById("contenedorFormulario");

const ticket=document.getElementById("ticket");

const btnRecargas=document.getElementById("btnRecargas");

const btnDepositos=document.getElementById("btnDepositos");

const btnRetiros=document.getElementById("btnRetiros");

const btnServicios=document.getElementById("btnServicios");

const btnHistorial=document.getElementById("btnHistorial");

const btnCorte=document.getElementById("btnCorte");

const btnConfig=document.getElementById("btnConfig");

btnRecargas.onclick=()=>mostrarFormularioRecarga();

btnDepositos.onclick=()=>mostrarFormularioDeposito();

btnRetiros.onclick=()=>mostrarFormularioRetiro();

btnServicios.onclick=()=>mostrarFormularioServicios();

btnHistorial.onclick=()=>alert("Historial (Próximamente)");

btnCorte.onclick=()=>alert("Corte de caja (Próximamente)");

btnConfig.onclick=()=>alert("Configuración (Próximamente)");

function generarFolio(){

    const hoy=new Date();

    const fecha=

    hoy.getFullYear()+

    String(hoy.getMonth()+1).padStart(2,"0")+

    String(hoy.getDate()).padStart(2,"0");

    let consecutivo=

    parseInt(localStorage.getItem("folio")||0);

    consecutivo++;

    localStorage.setItem("folio",consecutivo);

    return "MPC-"+fecha+"-"+String(consecutivo).padStart(3,"0");

}

function limpiarPantalla(){

    formulario.innerHTML="";

    ticket.style.display="none";

    ticket.textContent="";

}

// =====================================
// MÓDULO RECARGAS - PARTE 2A
// =====================================

function mostrarFormularioRecarga(){

    limpiarPantalla();

    const folio = generarFolio();

    formulario.innerHTML = `

    <h2>📱 Recargas</h2>

    <div id="listaRecargas">

        <div class="recarga">

            <label>Operadora</label>

            <select class="operadora">

                <option>Telcel</option>
                <option>BAIT</option>
                <option>Axios</option>
                <option>AT&T</option>
                <option>Movistar</option>

            </select>

            <label>Número</label>

            <input
            class="numero"
            maxlength="10"
            placeholder="9611234567">

            <label>Monto</label>

            <select class="monto">

                <option value="10">$10</option>
                <option value="20">$20</option>
                <option value="30">$30</option>
                <option value="40">$40</option>
                <option value="50">$50</option>
                <option value="60">$60</option>
                <option value="70">$70</option>
                <option value="80">$80</option>
                <option value="100">$100</option>
                <option value="120">$120</option>
                <option value="125">$125</option>
                <option value="130">$130</option>
                <option value="140">$140</option>
                <option value="150">$150</option>
                <option value="200">$200</option>

            </select>

        </div>

    </div>

    <button
    id="agregarRecarga"
    class="accion">

    ➕ Agregar otra recarga

    </button>

    <label>Tipo de pago</label>

    <select id="tipoPago">

        <option>Contado</option>
        <option>Crédito</option>

    </select>

    <div id="datosCredito" style="display:none;">

        <label>Plazo (días)</label>

        <input
        type="number"
        id="plazo"
        value="5">

    </div>

    <label>Folio</label>

    <input
    id="folio"
    value="${folio}">

    <button
    id="generarTicket"
    class="accion">

    Generar Ticket

    </button>

    `;

    document
    .getElementById("tipoPago")
    .onchange = function(){

        document
        .getElementById("datosCredito")
        .style.display =

        this.value=="Crédito"

        ?

        "block"

        :

        "none";

    };

    document
    .getElementById("agregarRecarga")
    .onclick = function(){

        const bloque =

        document
        .querySelector(".recarga")
        .cloneNode(true);

        document
        .getElementById("listaRecargas")
        .appendChild(bloque);

    };

    document
    .getElementById("generarTicket")
    .onclick = function(){

        alert("Parte 2B");

    };

}
