var jugada = 0;
var ganadosX = 0;
var ganadosO = 0;
var marca = -1;
var timer;

var tablero = [];
for (i = 0; i < 3 ; i++){ 
  tablero[i]= []; 
}


function inicializarTablero(){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			tablero[i][j] = 0;
		}
	}
	document.getElementById('reiniciar').disabled = true;
}


function mostrarX(pos){
	//console.log("Soy X");
	document.getElementById(pos).setAttribute("class", "icon x-icon");
}

function mostrarO(pos){
	//console.log("Soy O");
	document.getElementById(pos).setAttribute("class", "icon o-icon");

}

//Jugada
function marcarTableroOnline(pos, marca){
	var x = pos.substr(0, 1);
	var y = pos.substr(1, 1);	

	if(marca == 0){
		mostrarX(pos);
		tablero[x][y] = 1;
	}

	if(marca == 1){
		mostrarO(pos);
		tablero[x][y] = 2;
	}

	jugada++;
	evaluarJugada();
	vigilancia(false);
	//habilitarCasilleros();
}

function marcarTableroLocal(pos){
	var x = pos.substr(0, 1);
	var y = pos.substr(1, 1);	

	if(marca == 0){
		mostrarX(pos);
		tablero[x][y] = 1;
		guardarJugada(pos, 0);
	}

	if(marca == 1){
		mostrarO(pos);
		tablero[x][y] = 2;
		guardarJugada(pos, 1);	
	}

	jugada++;
	evaluarJugada();
	vigilancia(true);
	//inhabilitarCasilleros();
}

function decidirMarca(dato){
	marca = dato;
}

function obtenerMarca(){
	return marca;
}


//En cada movimiento, realizo una evaluacion de si existe un ganador
function evaluarJugada(){
	//Horizontal
	let j = 0;
	for(let i = 0; i < 3; i++){
		if(tablero[i][j]>0){
			if (tablero[i][j] == tablero[i][j+1] && tablero[i][j+1] == tablero[i][j+2]){
				if (tablero[i][j] == 1){
									document.getElementById('ganador').innerHTML = "Ganador X"; 
									ganadosX++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
								}
				if (tablero[i][j] == 2){document.getElementById('ganador').innerHTML = "Ganador O"; 
									ganadosO++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
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
								}
				if (tablero[i][j] == 2){
									document.getElementById('ganador').innerHTML = "Ganador O"; 
									ganadosO++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
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
								}
			if (tablero[1][1] == 2){document.getElementById('ganador').innerHTML = "Ganador O"; 
									ganadosO++; 
									opcionReiniciar(); 
									inhabilitarCasilleros();
								}
		}
	}
}

function mostrarEstadistica(){
	document.getElementById('ganadosX').innerHTML = ganadosX;
	document.getElementById('ganadosO').innerHTML = ganadosO;
}

function inhabilitarCasilleros(){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			document.getElementById(''+i+''+j+'').classList.add("disable");
		}
	}
}

function habilitarCasilleros(){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			document.getElementById(''+i+''+j+'').classList.add("icon");
		}
	}
}


//Reinicio de la partida
function opcionReiniciar(){
	document.getElementById('reiniciar').disabled = false;
}

function reiniciar(){
	vigilancia(false);
	
	var xhttp = new XMLHttpRequest();
   	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    	}
	};

    xhttp.open("GET", "php/reiniciar.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    

    inicializarTablero();
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			document.getElementById(''+i+''+j+'').setAttribute("class", "");
		}
	}
}


//Voy a trear las jugadas
async function traerDatos() {
    const response = await fetch('php/obtenerJugada.php', 
          {
              method: 'GET',
          });
    // Esperamos que complete el request
    const res = await response.json();
    return res;       
    }


function vigilancia(iniciar){
	if(iniciar){
		timer = setInterval(function() {
			traerDatos().then(dato => {
				if(dato!=0){
					var x = dato.posicion.substr(0, 1);
					var y = dato.posicion.substr(1, 1);
					if(tablero[x][y] == 0){
						marcarTableroOnline(dato.posicion, dato.marca);
					}
				}
			}), 
			5000
		});
	}else{
		clearInterval(timer);
	}
}

function guardarJugada(pos, marca){
    var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    	}
	};

    xhttp.open("POST", "php/realizarJugada.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("jugada="+pos+"&marca="+marca);
  }




