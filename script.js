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
console.log("Botón depósitos conectado");

btnRetiros.onclick=()=>mostrarFormularioRetiro();

btnServicios.onclick=()=>mostrarFormularioServicios();

btnHistorial.onclick=()=>mostrarHistorial();

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
.onclick = generarTicketRecarga;

}

// =====================================
// MÓDULO RECARGAS - PARTE 2B
// BENEFICIOS
// =====================================

function obtenerBeneficio(operadora,monto){

const beneficios={

"Telcel":{

10:"Dudas o aclaraciones *264. Más información https://www.telcel.com",

20:"100MB libres. Minutos y SMS ilimitados. WhatsApp ilimitado. 200MB Facebook, Messenger y X. Vigencia 2 días.",

30:"160MB libres. Minutos, SMS y WhatsApp ilimitados. 300MB Facebook, Messenger y X. Vigencia 3 días.",

50:"500MB libres. Minutos y SMS ilimitados. WhatsApp ilimitado. Redes Sociales Ilimitadas. Vigencia 7 días.",

80:"800MB libres. Minutos y SMS ilimitados. WhatsApp ilimitado. 1.5GB Redes Sociales. Vigencia 12 días.",

100:"1.5GB libres. Minutos y SMS ilimitados. Redes Sociales Ilimitadas. Vigencia 15 días.",

150:"2.5GB libres. Minutos y SMS ilimitados. Redes Sociales Ilimitadas. 500MB Claro Música. Incluye Prime Video Móvil. Vigencia 25 días.",

200:"3.5GB libres. Minutos y SMS ilimitados. Redes Sociales Ilimitadas. 500MB Claro Música. Incluye Prime Video Móvil. Vigencia 30 días."

},

"BAIT":{

30:"1GB de navegación + 500MB en Redes Sociales ilimitadas. Vigencia 3 días.",

50:"2GB de navegación + Redes Sociales Ilimitadas. Vigencia 7 días.",

60:"4GB de navegación + Redes Sociales Ilimitadas. Vigencia 7 días.",

100:"5GB de navegación + Redes Sociales Ilimitadas. Vigencia 15 días.",

120:"Internet ilimitado por 15 días.",

125:"8GB de navegación + Redes Sociales Ilimitadas. Vigencia 20 días.",

200:"12GB de navegación + Redes Sociales Ilimitadas. Vigencia 30 días."

},

"Axios":{

15:"500MB Redes Sociales + 500MB Navegación + 50 min + 25 SMS. Vigencia 1 día.",

30:"500MB Redes Sociales + 500MB Navegación + 250 min + 125 SMS. Vigencia 3 días.",

40:"2GB para navegar y Redes Sociales. Vigencia 3 días.",

50:"Redes Sociales Ilimitadas + 2GB. Vigencia 7 días.",

70:"Redes Sociales Ilimitadas + 6GB. Vigencia 7 días.",

100:"Redes Sociales Ilimitadas + 2GB. Vigencia 30 días.",

120:"Redes Sociales Ilimitadas + 3GB. Vigencia 30 días.",

130:"Redes Sociales Ilimitadas + 10GB. Vigencia 15 días.",

150:"Redes Sociales Ilimitadas + 4GB. Vigencia 30 días."

},

"AT&T":{

10:"100MB libres + 1GB Redes Sociales. Vigencia 1 día.",

20:"200MB libres + 1GB Redes Sociales. Vigencia 1 día.",

30:"300MB libres + 1GB Redes Sociales. Vigencia 3 días.",

50:"750MB libres + 1GB Redes Sociales. Vigencia 5 días.",

70:"4.5GB libres + 1GB Redes Sociales. Vigencia 10 días.",

100:"2GB libres + Redes Sociales Ilimitadas. Vigencia 14 días.",

120:"7.5GB libres + Redes Sociales Ilimitadas. Vigencia 21 días.",

150:"3GB libres + Redes Sociales Ilimitadas. Vigencia 25 días.",

200:"4GB libres + Redes Sociales Ilimitadas. Vigencia 30 días."

},

"Movistar":{

10:"Dudas o aclaraciones al *611.",

20:"Dudas o aclaraciones al *611.",

30:"Vigencia de la recarga 3 días.",

50:"7 días. Llamadas y SMS ilimitados. WhatsApp ilimitado. 600MB libres + 1GB Redes Sociales.",

60:"Dudas o aclaraciones al *611.",

70:"Dudas o aclaraciones al *611.",

80:"Dudas o aclaraciones al *611.",

100:"Vigencia de la recarga 15 días.",

120:"Dudas o aclaraciones al *611.",

140:"15 días. Llamadas y mensajes ilimitados. Redes Sociales. 7GB de navegación.",

150:"Vigencia 28 días.",

200:"Vigencia 30 días."

}

};

if(
beneficios[operadora] &&
beneficios[operadora][monto]
){

return beneficios[operadora][monto];

}

return "Beneficio no registrado.";

}
// =====================================
// MÓDULO RECARGAS - PARTE 2C-1
// GENERAR DATOS DEL TICKET
// =====================================

function generarTicketRecarga(){

    const bloques = document.querySelectorAll(".recarga");

    let detalle = "";

    let totalRecargas = 0;

    let totalComision = 0;

    bloques.forEach(function(bloque,index){

        const operadora = bloque.querySelector(".operadora").value;

        const numero = bloque.querySelector(".numero").value;

        const monto = parseFloat(
            bloque.querySelector(".monto").value
        );

        totalRecargas += monto;

        totalComision += CONFIG.comisionRecarga;

        detalle +=
"--------------------------------\n";

        detalle +=
"RECARGA " + (index+1) + "\n\n";

        detalle +=
"OPERADORA: " + operadora + "\n";

        detalle +=
"NUMERO: " + numero + "\n";

        detalle +=
"MONTO: $" + monto.toFixed(2) + "\n";

        detalle +=
"COMISION: $" + CONFIG.comisionRecarga.toFixed(2) + "\n\n";

        detalle +=
"BENEFICIOS:\n";

        detalle +=
obtenerBeneficio(operadora,monto) + "\n\n";

    });

    const total = totalRecargas + totalComision;

    const tipoPago =
        document.getElementById("tipoPago").value;

    let estado = "PAGADO";

    let datosCredito = "";

    if(tipoPago=="Crédito"){

        estado="PENDIENTE DE PAGO";

        const plazo=parseInt(
            document.getElementById("plazo").value
        );

        const fecha=new Date();

        fecha.setDate(
            fecha.getDate() + (plazo-1)
        );

        datosCredito +=
"\nPLAZO: " + plazo + " días";

        datosCredito +=
"\nFECHA DE PAGO: " +
fecha.toLocaleDateString();

    }

    construirTicketRecarga(
        detalle,
        totalRecargas,
        totalComision,
        total,
        estado,
        datosCredito
    );

}
// =====================================
// MÓDULO RECARGAS - PARTE 2C-2
// CONSTRUIR TICKET
// =====================================

function construirTicketRecarga(
detalle,
totalRecargas,
totalComision,
total,
estado,
datosCredito
){

    const ahora = new Date();

    const folio =
    document.getElementById("folio").value;

    ticket.style.display="block";

    ticket.textContent =

"================================\n"+
"        MI PUNTO CONECTA\n"+
"   RECARGAS, PAGOS Y SERVICIOS\n"+
"================================\n\n"+

"RECARGA EXITOSA\n\n"+

"FECHA: "+
ahora.toLocaleDateString()+
"\n"+

"HORA: "+
ahora.toLocaleTimeString()+
"\n\n"+

detalle+

"================================\n"+

"TOTAL RECARGAS: $"+
totalRecargas.toFixed(2)+
"\n"+

"COMISIONES: $"+
totalComision.toFixed(2)+
"\n"+

"TOTAL COBRADO: $"+
total.toFixed(2)+
"\n\n"+

"FOLIO: "+
folio+
"\n"+

"ESTATUS: "+
estado+

datosCredito+

"\n\n================================\n"+

CONFIG.negocio+
"\n"+

CONFIG.direccion;

guardarHistorial({
    fecha: ahora.toLocaleDateString(),
    hora: ahora.toLocaleTimeString(),
    folio: folio,
    servicio: "Recarga",
    total: total,
    ticket: ticket.textContent
});

mostrarBotonesTicket();

}

// =====================================
// MÓDULO RECARGAS - PARTE 2D-1
// HISTORIAL Y BOTONES
// =====================================

function guardarHistorial(registro){

    let historial =
    JSON.parse(localStorage.getItem("historialMPC") || "[]");

    historial.unshift(registro);

    localStorage.setItem(
        "historialMPC",
        JSON.stringify(historial)
    );

}

function mostrarBotonesTicket(){

    if(document.getElementById("botonesTicket")){
        return;
    }

    const botones = document.createElement("div");

    botones.id = "botonesTicket";

    botones.className = "botonesTicket";

    botones.innerHTML = `

<button id="btnDescargar" class="btnDescargar">
📥 Descargar Ticket
</button>

<button id="btnImprimir" class="btnImprimir">
🖨️ Imprimir
</button>

<button id="btnWhatsapp" class="btnWhatsapp">
📲 Compartir por WhatsApp
</button>

`;

    ticket.insertAdjacentElement(
        "afterend",
        botones
    );

    document.getElementById("btnDescargar").onclick =
    descargarTicket;

    document.getElementById("btnImprimir").onclick =
    imprimirTicket;

    document.getElementById("btnWhatsapp").onclick =
    compartirWhatsapp;

}

// =====================================
// MÓDULO RECARGAS - PARTE 2D-2
// DESCARGAR - IMPRIMIR - WHATSAPP
// =====================================

function descargarTicket(){

    html2canvas(ticket,{
        backgroundColor:"#ffffff",
        scale:2
    }).then(function(canvas){

        const enlace = document.createElement("a");

        enlace.download =
        "Ticket-"+Date.now()+".png";

        enlace.href =
        canvas.toDataURL("image/png");

        enlace.click();

    });

}

function imprimirTicket(){

    const ventana = window.open("", "_blank");

    ventana.document.write("<pre>");

    ventana.document.write(ticket.textContent);

    ventana.document.write("</pre>");

    ventana.document.close();

    ventana.print();

}

function compartirWhatsapp(){

    const mensaje =
    encodeURIComponent(ticket.textContent);

    window.open(

    "https://wa.me/?text="+mensaje,

    "_blank"

    );

}

// =====================================
// MÓDULO DEPÓSITOS - PARTE 3A
// =====================================

function mostrarFormularioDeposito(){

    limpiarPantalla();

    const folio = generarFolio();

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

    <label>Nombre del titular</label>

    <input
    id="titular"
    placeholder="Nombre completo">

    <label>Número de cuenta o tarjeta</label>

    <input
    id="cuenta"
    placeholder="16 o más dígitos">

    <label>Monto del depósito</label>

    <input
    type="number"
    id="montoDeposito">

    <label>Comisión</label>

    <input
    type="number"
    id="comisionDeposito"
    placeholder="Ejemplo: 17">

    <label>Horario</label>

    <input
    id="horario"
    placeholder="09:00 - 21:00">

    <label>Número de autorización (opcional)</label>

<input
id="autorizacion"
placeholder="Ejemplo: 84752136">

    <label>Folio</label>

    <input
    id="folioDeposito"
    value="${folio}">

    <button
    id="generarDeposito"
    class="accion">

    Generar Ticket

    </button>

    `;

    document
    .getElementById("generarDeposito")
    .onclick = generarTicketDeposito;

}

function generarTicketDeposito(){

    const banco = document.getElementById("banco").value;

    const titular = document.getElementById("titular").value;

    const cuenta = document.getElementById("cuenta").value;

    const monto = parseFloat(document.getElementById("montoDeposito").value || 0);

    const comision = parseFloat(document.getElementById("comisionDeposito").value || 0);

    const horario = document.getElementById("horario").value;

    const autorizacion =
document.getElementById("autorizacion").value;

    const folio = document.getElementById("folioDeposito").value;

    const total = monto + comision;

    construirTicketDeposito(
    banco,
    titular,
    cuenta,
    monto,
    comision,
    total,
    horario,
    autorizacion,
    folio
);

}
console.log("Script cargado completo");

// =====================================
// MÓDULO DEPÓSITOS - PARTE 3B-2
// TICKET DEFINITIVO
// =====================================

function ocultarCuenta(cuenta){

    cuenta = cuenta.replace(/\D/g,"");

    if(cuenta.length < 8){
        return cuenta;
    }

    return (
        cuenta.substring(0,4) +
        " **** **** " +
        cuenta.substring(cuenta.length-4)
    );

}

function construirTicketDeposito(

banco,
titular,
cuenta,
monto,
comision,
total,
horario,
autorizacion,
folio

){

    const ahora = new Date();

    ticket.style.display = "block";

    ticket.textContent =

"================================\n"+
"        MI PUNTO CONECTA\n"+
"   RECARGAS, PAGOS Y SERVICIOS\n"+
"================================\n\n"+

"DEPÓSITO EN EFECTIVO ✓\n\n"+

"FECHA: " + ahora.toLocaleDateString() + "\n"+
"HORA : " + ahora.toLocaleTimeString() + "\n\n"+

"BANCO : " + banco + "\n"+
"TITULAR:\n"+
titular + "\n\n"+

"CUENTA:\n"+
ocultarCuenta(cuenta) + "\n\n"+

"IMPORTE : $" + monto.toFixed(2) + "\n"+
"COMISIÓN: $" + comision.toFixed(2) + "\n"+
"TOTAL   : $" + total.toFixed(2) + "\n\n"+

"FOLIO   : " + folio + "\n"+
"TERMINAL: " + CONFIG.terminal + "\n";

    if(horario.trim()!=""){

        ticket.textContent +=
"HORARIO : " + horario + "\n";

    }

    if(autorizacion!=""){

        ticket.textContent +=
"AUTORIZACIÓN.: " + autorizacion + "\n";

    }

    ticket.textContent +=

"\n================================\n"+

CONFIG.negocio + "\n"+

CONFIG.direccion + "\n\n"+

"Conserve este comprobante.\n"+
"Gracias por su preferencia.";

    guardarHistorial({

        fecha: ahora.toLocaleDateString(),

        hora: ahora.toLocaleTimeString(),

        folio: folio,

        servicio: "Depósito",

        total: total,

        ticket: ticket.textContent

    });

    mostrarBotonesTicket();

}
// =====================================
// MÓDULO RETIROS - PARTE 4A-1
// FORMULARIO
// =====================================

function mostrarFormularioRetiro(){

    limpiarPantalla();

    const folio = generarFolio();

    formulario.innerHTML = `

    <h2>💸 Retiro de efectivo</h2>

    <label>Monto a retirar</label>

    <input
    type="number"
    id="montoRetiro">

    <label>Comisión</label>

    <input
    type="number"
    id="comisionRetiro"
    placeholder="Ejemplo: 17">

    <label>Banco / Tarjeta</label>

    <input
    id="bancoRetiro"
    placeholder="BBVA, Banamex, Santander...">

    <label>Últimos 4 dígitos de la tarjeta</label>

    <input
    id="ultimos4"
    maxlength="4"
    placeholder="1234">

    <label>Número de autorización (opcional)</label>

    <input
    id="autorizacionRetiro"
    placeholder="Ejemplo: 582741">

    <label>Folio</label>

    <input
    id="folioRetiro"
    value="${folio}">

    <button
    id="generarRetiro"
    class="accion">

    Generar Ticket

    </button>

    `;

    document
    .getElementById("generarRetiro")
    .onclick = generarTicketRetiro;

}
function generarTicketRetiro(){

    const monto = parseFloat(
        document.getElementById("montoRetiro").value || 0
    );

    const comision = parseFloat(
        document.getElementById("comisionRetiro").value || 0
    );

    const banco =
    document.getElementById("bancoRetiro").value;

    const ultimos4 =
    document.getElementById("ultimos4").value;

    const autorizacion =
    document.getElementById("autorizacionRetiro").value;

    const folio =
    document.getElementById("folioRetiro").value;

    const total = monto + comision;

    construirTicketRetiro(

        monto,
        comision,
        total,
        banco,
        ultimos4,
        autorizacion,
        folio

    );

}
// =====================================
// MÓDULO RETIROS - PARTE 4B-1
// TICKET
// =====================================

function construirTicketRetiro(

monto,
comision,
total,
banco,
ultimos4,
autorizacion,
folio

){

    const ahora = new Date();

    ticket.style.display = "block";

    ticket.textContent =

"================================\n"+
"        MI PUNTO CONECTA\n"+
"   RECARGAS, PAGOS Y SERVICIOS\n"+
"================================\n\n"+

"RETIRO DE EFECTIVO ✓\n\n"+

"FECHA: " + ahora.toLocaleDateString() + "\n"+
"HORA : " + ahora.toLocaleTimeString() + "\n\n"+

"BANCO : " + banco + "\n"+
"TARJETA: **** " + ultimos4 + "\n\n"+

"RETIRO : $" + monto.toFixed(2) + "\n"+
"COMISIÓN: $" + comision.toFixed(2) + "\n"+
"TOTAL   : $" + total.toFixed(2) + "\n\n"+

"FOLIO   : " + folio + "\n"+
"TERMINAL: " + CONFIG.terminal + "\n";

    if(autorizacion.trim()!=""){

        ticket.textContent +=
"AUTORIZACIÓN: " + autorizacion + "\n";

    }

    ticket.textContent +=

"\n================================\n"+

CONFIG.negocio + "\n"+

CONFIG.direccion + "\n\n"+

"Conserve este comprobante.\n"+
"Gracias por su preferencia.";

    guardarHistorial({

        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString(),
        folio: folio,
        servicio: "Retiro",
        total: total,
        ticket: ticket.textContent

    });

    mostrarBotonesTicket();

}
// =====================================
// MÓDULO SERVICIOS - PARTE 5A-1
// FORMULARIO
// =====================================

function mostrarFormularioServicios(){

    limpiarPantalla();

    const folio = generarFolio();

    formulario.innerHTML = `

    <h2>📺 Pago de servicios</h2>

    <label>Empresa</label>

    <select id="empresaServicio">

        <option>CFE</option>
        <option>Telmex</option>
        <option>Izzi</option>
        <option>Megacable</option>
        <option>Totalplay</option>
        <option>SKY</option>
        <option>VeTV</option>
        <option>Star TV</option>
        <option>Agua</option>

    </select>

    <label>Referencia o número de servicio</label>

    <input
    id="referenciaServicio"
    placeholder="Número de referencia">

    <label>Nombre del cliente (opcional)</label>

    <input
    id="clienteServicio">

    <label>Importe</label>

    <input
    type="number"
    id="importeServicio">

    <label>Comisión</label>

    <input
    type="number"
    id="comisionServicio"
    placeholder="Ejemplo: 15">

    <label>Número de autorización (opcional)</label>

    <input
    id="autorizacionServicio">

    <label>Folio</label>

    <input
    id="folioServicio"
    value="${folio}">

    <button
    id="generarServicio"
    class="accion">

    Generar Ticket

    </button>

    `;

    document
    .getElementById("generarServicio")
    .onclick = generarTicketServicio;

}
function generarTicketServicio(){

    console.log("Entró a generarTicketServicio");

    const empresa =
    document.getElementById("empresaServicio").value;

    const referencia =
    document.getElementById("referenciaServicio").value;

    const cliente =
    document.getElementById("clienteServicio").value;

    const importe =
    parseFloat(
        document.getElementById("importeServicio").value || 0
    );

    const comision =
    parseFloat(
        document.getElementById("comisionServicio").value || 0
    );

    const autorizacion =
    document.getElementById("autorizacionServicio").value;

    const folio =
    document.getElementById("folioServicio").value;

    const total = importe + comision;

    construirTicketServicio(
        empresa,
        referencia,
        cliente,
        importe,
        comision,
        total,
        autorizacion,
        folio
    );

}
function construirTicketServicio(

empresa,
referencia,
cliente,
importe,
comision,
total,
autorizacion,
folio

){

    const ahora = new Date();

    ticket.style.display = "block";

    ticket.textContent =

"================================\n"+
"        MI PUNTO CONECTA\n"+
"   RECARGAS, PAGOS Y SERVICIOS\n"+
"================================\n\n"+

"PAGO DE SERVICIO ✓\n\n"+

"FECHA: " + ahora.toLocaleDateString() + "\n"+
"HORA : " + ahora.toLocaleTimeString() + "\n\n"+

"EMPRESA : " + empresa + "\n"+
"REFERENCIA:\n"+
referencia + "\n\n";

    if(cliente.trim()!=""){

        ticket.textContent +=
"CLIENTE:\n"+
cliente + "\n\n";

    }

    ticket.textContent +=

"IMPORTE : $" + importe.toFixed(2) + "\n"+
"COMISIÓN: $" + comision.toFixed(2) + "\n"+
"TOTAL   : $" + total.toFixed(2) + "\n\n"+

"FOLIO   : " + folio + "\n"+
"TERMINAL: " + CONFIG.terminal + "\n";

    if(autorizacion.trim()!=""){

        ticket.textContent +=
"AUTORIZACIÓN: " + autorizacion + "\n";

    }

    ticket.textContent +=

"\n================================\n"+

CONFIG.negocio + "\n"+

CONFIG.direccion + "\n\n"+

"Conserve este comprobante.\n"+
"Gracias por su preferencia.";

    guardarHistorial({

        fecha: ahora.toLocaleDateString(),

        hora: ahora.toLocaleTimeString(),

        folio: folio,

        servicio: "Pago de servicio",

        total: total,

        ticket: ticket.textContent

    });

    mostrarBotonesTicket();

}
// =====================================
// MÓDULO HISTORIAL - PARTE 1
// =====================================

function mostrarHistorial(){

    limpiarPantalla();

    let historial = JSON.parse(
        localStorage.getItem("historialMPC") || "[]"
    );

    if(historial.length==0){

        formulario.innerHTML=`

        <h2>📚 Historial</h2>

        <p>No existen movimientos registrados.</p>

        `;

        return;

    }

    let html="<h2>📚 Historial</h2>";

    historial.forEach(function(item,index){

        html+=`

        <div class="historialItem">

<strong>${item.servicio}</strong><br>

${item.fecha} ${item.hora}<br>

Folio: ${item.folio}<br>

Total: $${item.total.toFixed(2)}<br><br>

<button
onclick="abrirTicketHistorial(${index})">

📄 Ver Ticket

</button>

<button
onclick="eliminarMovimiento(${index})">

🗑 Eliminar

</button>

</div>

        `;

    });

    formulario.innerHTML=html;

}
// =====================================
// MÓDULO HISTORIAL - PARTE 2
// ABRIR TICKET
// =====================================

function abrirTicketHistorial(indice){

    let historial = JSON.parse(
        localStorage.getItem("historialMPC") || "[]"
    );

    ticket.style.display = "block";

    ticket.textContent =
    historial[indice].ticket;

    mostrarBotonesTicket();

}
// =====================================
// HISTORIAL - ELIMINAR MOVIMIENTO
// =====================================

function eliminarMovimiento(indice){

    if(!confirm("¿Eliminar este movimiento?")){
        return;
    }

    let historial = JSON.parse(
        localStorage.getItem("historialMPC") || "[]"
    );

    historial.splice(indice,1);

    localStorage.setItem(
        "historialMPC",
        JSON.stringify(historial)
    );

    mostrarHistorial();

}
