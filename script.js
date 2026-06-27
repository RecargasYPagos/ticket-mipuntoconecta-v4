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
