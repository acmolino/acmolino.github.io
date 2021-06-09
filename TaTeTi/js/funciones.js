var jugada = 0;
var ganadosX = 0;
var ganadosO = 0;

var tablero = [];
for (i = 0; i < 3 ; i++){ 
  tablero[i]= []; 
}

/**
 *Iniciliza el tablero
 * 
 * Marca todas las casillas vacias y en 0
 * Desahilita el boton de reiniciar hasta que finalice
 * la partida
 */
function inicializarTablero(){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			tablero[i][j] = 0;
		}
	}
	document.getElementById('reiniciar').disabled = true;
}

/**
 * 
 * 
 * 
 * 
 */
function mostrarX(pos){
	//console.log("Soy X");
	document.getElementById(pos).setAttribute("class", "icon x-icon");
}

function mostrarO(pos){
	//console.log("Soy O");
	document.getElementById(pos).setAttribute("class", "icon o-icon");

}

//Jugada
function marcarTablero(pos){
	var x = pos.substr(0, 1);
	var y = pos.substr(1, 1);	

	if(jugada%2==0){
		mostrarX(pos);
		tablero[x][y] = 1;
	}else{
		mostrarO(pos);
		tablero[x][y] = 2;
	}
	jugada++;
	evaluarJugada();
}


//En cada movimiento, realizo una evaluacion de si existe un ganador
function evaluarJugada(){

	//Horizontal
	let j = 0;
	for(let i = 0; i < 3; i++){
		if(tablero[i][j]>0){
			if (tablero[i][j] == tablero[i][j+1] && tablero[i][j+1] == tablero[i][j+2]){
				if (tablero[i][j] == 1){document.getElementById('ganador').innerHTML = "Ganador X"; 
									ganadosX++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
									mostrarEstadistica();
								}
				if (tablero[i][j] == 2){document.getElementById('ganador').innerHTML = "Ganador O"; 
									ganadosO++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
									mostrarEstadistica();
								}
			}
		}	
	}

	//Vertical
	let i = 0
	for(let j = 0; j < 3; j++){
		if(tablero[i][j] > 0){
			if (tablero[i][j] == tablero[i+1][j] && tablero[i+1][j] == tablero[i+2][j]){
				if (tablero[i][j] == 1){
									document.getElementById('ganador').innerHTML = "Ganador X"; 
									ganadosX++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
									mostrarEstadistica();
								}
				if (tablero[i][j] == 2){
									document.getElementById('ganador').innerHTML = "Ganador O"; 
									ganadosO++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
									mostrarEstadistica();
								}
			}
		}
		
	}

	//Diagonal
	if (tablero[1][1] != 0){
		if ((tablero[1][1] == tablero[0][0] && tablero[0][0] == tablero[2][2])|| 
			(tablero[1][1] == tablero[2][0] && tablero[2][0] == tablero[0][2])){
			if (tablero[1][1] == 1){document.getElementById('ganador').innerHTML = "Ganador X"; 
									ganadosX++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
									mostrarEstadistica();
								}
			if (tablero[1][1] == 2){document.getElementById('ganador').innerHTML = "Ganador O"; 
									ganadosO++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
									mostrarEstadistica();
								}
		}
	}

	if(tableroLleno()){
			opcionReiniciar(); 
			inhabilitarCasilleros();
			document.getElementById('ganador').innerHTML = "Empate"; 
	}
}

/**
 * Verifica que el tablero no se haya completado
 * 
 * Es en un posible caso donde se complete sin ganador
 */
function tableroLleno(){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if(tablero[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}



function mostrarEstadistica(){
	document.getElementById('ganadosX').innerHTML = ganadosX;
	document.getElementById('ganadosO').innerHTML = ganadosO;
}



function inhabilitarCasilleros(){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			document.getElementById(''+i+''+j+'').classList.add("icon");
		}
	}
}


//Reinicio de la partida
function opcionReiniciar(){
	document.getElementById('reiniciar').disabled = false;
	document.getElementById('ganador').innerHTML = "";
}


function reiniciar(){
	inicializarTablero();
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			document.getElementById(''+i+''+j+'').setAttribute("class", "");
		}
	}
}
