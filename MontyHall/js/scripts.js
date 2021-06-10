document.getElementById("reinicio").disabled = true;
var puertas = asignacion_primaria();
var eleccionPrimaria;
var totalJugados = 0;
var totalGanados = 0;
var totalPerdidos = 0;
var cambioPuertaJugados = 0;
var cambioPuertaGanados = 0;
var cambioPuertaPerdidos =0;
var mismaPuertaJugados = 0;
var mismaPuertaGanados = 0;
var mismaPuertaPerdidos = 0;

/*La puerta del auto tendrá valor 1*/
function asignacion_primaria(){
	var puertas = [0,0,1];
	puertas.sort(function(a, b){return 0.5 - Math.random()});
	return puertas;
}

function reinicioDePuertas(){
		/*Rescribo los botones para los reinicios*/
	document.getElementById(0).setAttribute("onclick", "elegirPuerta(0)");
	document.getElementById(1).setAttribute("onclick", "elegirPuerta(1)");
	document.getElementById(2).setAttribute("onclick", "elegirPuerta(2)");


	document.getElementById(0).setAttribute("class", "puerta puertaCerrada");
	document.getElementById(1).setAttribute("class", "puerta puertaCerrada");
	document.getElementById(2).setAttribute("class", "puerta puertaCerrada");

	document.getElementById("reinicio").disabled = true;
	puertas = asignacion_primaria();
}


/*Elegimos puerta*/
/*Se abrirta una opcion que no*/
/*La puerta que abre el presentador tendrá valor 2*/
function elegirPuerta(eleccion){
	eleccionPrimaria = eleccion;
	do{
		var abro = Math.floor(Math.random() * 3);
		a = puertas[abro];
		if (abro == eleccion){
			a = 1;
		}
		var abierta = abro;
	}while(a == 1);
	
	puertas[abierta] = 2;
	document.getElementById(abierta).disabled = true;
	document.getElementById(abierta).removeAttribute("onclick");
	document.getElementById(abierta).setAttribute("class", "puerta puertaAbierta");
	document.getElementById(eleccion).setAttribute("class", "puerta primeraEleccion");

	for (var i = 0; i < 3; i++) {
		if(i != abierta){
			document.getElementById(i).setAttribute("onclick", "eleccionFinal("+i+")");
		}
	}



	return puertas;
}



function eleccionFinal(eleccion){
	let resultado;
	totalJugados++;
	if(puertas[eleccion] == 1){
		totalGanados++;
		resultado = "Ganaste";
		if(eleccion == eleccionPrimaria){
			mismaPuertaGanados++;
			mismaPuertaJugados++;
		}else{
			cambioPuertaGanados++;
			cambioPuertaJugados++;
		}
	}else{
		totalPerdidos++;
		if(eleccion == eleccionPrimaria){
			mismaPuertaPerdidos++;
			mismaPuertaJugados++;
		}else{
			cambioPuertaPerdidos++;
			cambioPuertaJugados++;
		}
		resultado = "Perdiste";
	}
	abrirTodasPuertas();
	aviso(resultado);
	document.getElementById("reinicio").disabled = false;
	cargaResultados();
}

function abrirTodasPuertas(){
	for (i =0; i<3; i++){
		if(puertas[i]==1){
			document.getElementById(i).setAttribute("class", "puerta puertaGanadora");
		}else{
			document.getElementById(i).setAttribute("class", "puerta puertaAbierta");
		}
	}
}


function cargaResultados(){
	document.getElementById("TotalesJugados").innerHTML = totalJugados;
	document.getElementById("TotalesGanados").innerHTML = totalGanados;
	document.getElementById("TotalesPerdidos").innerHTML = totalPerdidos;

	document.getElementById("SCTotal").innerHTML = mismaPuertaJugados;
	document.getElementById("SCGanados").innerHTML = mismaPuertaGanados;
	document.getElementById("SCPerdidos").innerHTML = mismaPuertaPerdidos;

	document.getElementById("cambioTotal").innerHTML = cambioPuertaJugados;
	document.getElementById("cambioGanados").innerHTML = cambioPuertaGanados;
	document.getElementById("cambioPerdidos").innerHTML = cambioPuertaPerdidos;

}

function aviso(resultado){
	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[0];

  	modal.style.display = "block";

  	document.getElementById("TextoResultado").innerHTML = resultado;
	

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
  		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
  		if (event.target == modal) {
    		modal.style.display = "none";
  		}
	}
}