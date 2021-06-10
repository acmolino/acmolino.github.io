//Zona segura de carga del documento
$(document).ready(function(){
	traerMaso().then(dato => {
    maso = dato.deck_id;
	});
	$('#btnIniciarMano').show();

});

/*###################  Vartiables globales auxiliares  #####################*/
var maso; //Variable que guarda el codigo del maso que proporciona la API

var cartaOculta;

var puntosCrupier = 0;
var puntosJugador = 0;

var jugada = []; //Array que junta las cartas de esa jugada para el jugador
var jugadaMesa = []; //Array que junta las cartas de esa jugada para la mesa
/*##########################################################################*/



/*#######################   Llamadas al servidor  ####################################*/
/**
*Trae por priemar vez el código del maso
*
*
*@return String código del maso
*/
async function traerMaso(){
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', 
    {
        method: 'GET',
    });
    const res = await response.json();
    return res;       
}



/**
 * Devuelve cartas del mazo
 * 
 * Devuelve la cantidad de cartas que le pasamos a la función
 * @return objeto promesa con datos de las cartas
 */
async function darCarta(cant){
  const response = await fetch('https://deckofcardsapi.com/api/deck/'+maso+'/draw/?count='+cant, 
    {
        method: 'GET',
    });
    const res = await response.json();
    return res;       
}

/**
*Reultilza mismo maso
*
*Vuelve a entreverar el mismo maso
*
*/
async function rearmarMazo(){
  const response = await fetch('https://deckofcardsapi.com/api/deck/'+maso+'/shuffle/', 
    {
        method: 'GET',
    });
    const res = await response.json();
    return res;       
}


function vaciarJugadas(){
	for (let i = jugada.length; i > 0; i--) {
 	 jugada.pop();
	}
	for (let i = jugadaMesa.length; i > 0; i--) {
 	 jugadaMesa.pop();
	}
}


/**
 * Inicio de mano
 * 
 * Limpia todas las variables y reacomoda la pantalla
 * 
 */ 
function iniciarMano(){

	$('#cartasMesa').empty();
	$('#cartasJugador').empty();
	$('#btnIniciarMano').hide();
	$('#separacionMedio').show();
	$('#separacionBaja').show();

	$('#puntosMesa').text("");

	vaciarJugadas();
	
	darCarta(2).then(dato => {
			//console.log(dato);
    	$('#cartasMesa').append("<img src='"+dato.cards[0].image+"' width='100'>");
    	$('#cartasMesa').append("<img src='img/back.jpg' width='100' id='cartaOculta'>");
    	cartaOculta = dato.cards[1].image;
    	jugadaMesa.push(dato.cards[0].value); //Agrega la carta a su jugada
    	jugadaMesa.push(dato.cards[1].value);
    	puntosCrupier = sumarValores(jugadaMesa);
	});



	darCarta(2).then(dato => {
  		//console.log(dato);
  		$('#cartasJugador').append("<img src='"+dato.cards[0].image+"' width='100'>");
  		$('#cartasJugador').append("<img src='"+dato.cards[1].image+"' width='100'>");
    	jugada.push(dato.cards[0].value);
    	jugada.push(dato.cards[1].value);
    	puntosJugador = sumarValores(jugada);
    	$('#puntosJugador').text("Jugador: "+puntosJugador);

	});

	$('#btnDarCarta').show();
	$('#btnPlantarse').show();
	$('#btnDarCarta').prop( "disabled", false );
	$('#btnPlantarse').prop( "disabled", false );

	$('#btnDarDeNuevo').show();
	$("#btnDarDeNuevo").prop( "disabled", true );
}


/**
*Entrevera las cartas y empieza una nueva mano
*con el mismo maso
*
*Limpia la mesa
*/
function repartirNuevamante(){
	rearmarMazo().then(dato => {
		iniciarMano();
	});
}


/**
*Devuelve el valor numerico de una carta
*
*Algunas cartas viene con valores como KING o ACE
*y la función les asigna un valor numerico para poder
*contar los puntos
*
*@param obj carta
*
*@return int valor numerico
*/
function devolverValorCarta(carta){
	let cartaValor;
	if(carta == 'KING' || carta == 'QUEEN' || carta == 'JACK'){
		cartaValor = 10;
	}else if(carta == 'ACE'){
		cartaValor = 11;
	}else{
		cartaValor = parseInt(carta);
	}

	return cartaValor;
}


/**
*Da una carta al jugador
*
*
*/
function darCartaJugador(){
	darCarta(1).then(dato => {
		$('#cartasJugador').append("<img src='"+dato.cards[0].image+"' width='100'>");

		jugada.push(dato.cards[0].value);
		puntosJugador = sumarValores(jugada);

		if(puntosJugador > 21){	
			$("#btnDarCarta").prop( "disabled", true );
			$("#btnPlantarse").prop( "disabled", true );
			$("#btnDarDeNuevo").prop( "disabled", false );
			$('#puntosJugador').text("Jugador: "+puntosJugador);
			alert("Perdiste, vuelve a intentarlo");
		}
		$('#puntosJugador').text("Jugador: "+puntosJugador);

	});		
}


/**
*Trae las cartas para la banca luego de que el jugador se planto
*
*Va evaluando el resultado para ver si tiene que volver a sacar cartas
*
*
*@return int puntos de la mesa
*/
async function darMesaCartas(){
	while(puntosCrupier < puntosJugador){
		const response = await fetch('https://deckofcardsapi.com/api/deck/'+maso+'/draw/?count=1', 
		{
        	method: 'GET',
    	});
    	const res = await response.json();
    	

	    	$('#cartasMesa').append("<img src='"+res.cards[0].image+"' width='100'>");

	    	//Asigno valor al AS, dependiendo de como venga la jugada
	  		jugadaMesa.push(res.cards[0].value);
	  		puntosCrupier = sumarValores(jugadaMesa);

	   	 	//puntosCrupier = puntosCrupier +  devolverValorCarta(res.cards[0].value);
	   	 	$('#puntosMesa').text("Mesa: "+puntosCrupier);
	   	
	}
    
    return puntosCrupier;       
}




/**
 *Suma los valores dentro de la jugada 
 * 
 * Además evalua en cada jugada depende de la situación
 * si el AS debe valor 11 o 1. En caso de pasarse con 
 * 11 simplemente resta 10
 */
function sumarValores(cartas){
	var suma = 0;
	var tengoAs = false;
	for (var i = 0; i < cartas.length; i++) {
		suma = suma + devolverValorCarta(cartas[i]);
		if(cartas[i] == 'ACE'){
			tengoAs = true;
		}
	}
	if(suma > 21 && tengoAs){
		suma = suma -10;
	}

	return suma;
}

/**
*
*
*
*/
function darCartaMesa(){
	darMesaCartas().then(dato => {
		setTimeout(function(){
			if(puntosCrupier > 21){
				alert("Jugador gana");
			}else{
				alert("La casa gana");
			}
		}, 2000);
	});
}


/**
*Evalua ambos puntajes para dar un ganador
*
*
*/
function plantarse(){

	$('#cartaOculta').attr('src', cartaOculta);
	$('#puntosMesa').text("Banca: "+puntosCrupier);

	$('#btnDarCarta').prop( "disabled", true );
	$('#btnPlantarse').prop( "disabled", true );
	$("#btnDarDeNuevo").prop( "disabled", false );


	setTimeout(function(){ 
		if(puntosCrupier < puntosJugador){
			darCartaMesa();
		}
		
		if(puntosCrupier >= puntosJugador){
			alert("La casa gana");
		}
	}, 2000);
	
}