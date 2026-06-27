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
