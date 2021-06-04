function AgregarCampos() {
	document.getElementById("grilla").innerHTML ="";
	cant = document.getElementById("cantidad").value;
	if (cant>1){
		for(i=0; i<cant;i++){
			for(j=0; j<cant; j++){
  				var casilla = document.createElement("INPUT");
  				casilla.type = "text";
  				casilla.value = "0";
  				casilla.id = i+""+j;
  				casilla.onclick=function(){cambioValoryColor(this.value, this.id); quitarPropiedades();}
				document.getElementById("grilla").appendChild(casilla);
			}
			var salto = document.createElement("BR");
  		document.getElementById("grilla").appendChild(salto);
			
		}
		botonesCargaMatriz();
	}else{
		document.getElementById("grilla").innerHTML = "<p>La matriz debe tener al menos orden 2</p>"
	}	
}


/*#######################################################################################*/
/*#######################################################################################*/
/*#######################################################################################*/
/*#######################################################################################*/

/*Para cargar elementos del conjunto*/
function elementosDeConjunto(){
  document.getElementById("elementosCarga").innerHTML ="Detemina los elementos del conjunto<br>";
  cant = document.getElementById("cantidad").value;
  
  if (cant>1){
    for(i=0; i<cant;i++){
        var casilla = document.createElement("INPUT");
        casilla.type = "text";
        casilla.id = "Elem"+i;
        document.getElementById("elementosCarga").appendChild(casilla);
    }
    boton = document.createElement("INPUT");
    boton.type="button";
    boton.value="Generar Matriz";
    document.getElementById("BotonMostrar").innerHTML="";
    document.getElementById("BotonMostrar").appendChild(boton); 
    boton.onclick=function(){
      AgregarCamposCElementos(obtenerElementos());
    }
  }
  

}

function obtenerElementos(){
  cant = document.getElementById("cantidad").value;
  elementos = new Array(cant);

   for(i=0; i<cant;i++){
    elementos[i]=document.getElementById("Elem"+i).value;
   }

   return elementos;

}

/*Trabajando en funcion que cargue los elementos del conjunto al costado y arriba de la matriz*/
function AgregarCamposCElementos(elementos) {
  document.getElementById("elementosCarga").innerHTML ="";
  document.getElementById("BotonMostrar").innerHTML ="";
  document.getElementById("grilla").innerHTML ="";
  cant = elementos.length;

/*Para espacio en elementos horizontales*/ 
 var horizontalElem = document.createElement("SPAN");
horizontalElem.id="EH";
document.getElementById("grilla").appendChild(horizontalElem);

/*Imprimo elementos horizontalesx*/
  for(i=0; i<cant;i++){
      var horizontalElem = document.createElement("SPAN");
      horizontalElem.id="EH";
      var cont = document.createTextNode(elementos[i]);
      horizontalElem.appendChild(cont);
      document.getElementById("grilla").appendChild(horizontalElem);
    }
    var salto = document.createElement("BR");
    document.getElementById("grilla").appendChild(salto);

    for(i=0; i<cant;i++){
      for(j=0; j<cant; j++){
          if (j == 0){
            var vericalElem = document.createElement("SPAN");
            vericalElem.id="EV";
            var cont = document.createTextNode(elementos[i]);
            vericalElem.appendChild(cont);
            document.getElementById("grilla").appendChild(vericalElem);
          }
          
            var casilla = document.createElement("INPUT");
            casilla.type = "text";
            casilla.value = "0";
            casilla.name= elementos[i]+","+elementos[j];
            casilla.id = i+""+j;
            casilla.onclick=function(){cambioValoryColor(this.value, this.id); quitarPropiedades(); MostrarParesOrdenados(this.value, this.name);}
            document.getElementById("grilla").appendChild(casilla);
    
      }
      var salto = document.createElement("BR");
      document.getElementById("grilla").appendChild(salto);

    }
    document.getElementById("RelacionAxA").innerHTML ="R = {<span id='ParesO'></span>}"
    botonesCargaMatriz();
  }


  function MostrarParesOrdenados(valor, id){
    var ParO = document.createElement("SPAN");
    if (valor == 1){
      if (!document.getElementById("ParesO").hasChildNodes()){
        var cont = document.createTextNode(" ("+id+") ");
      }else{
        var cont = document.createTextNode(" ,("+id+") ");
      }

      ParO.appendChild(cont);
      ParO.id=id;
      document.getElementById("ParesO").appendChild(ParO);
    }

    if (valor == 0){
      var elemquitado = document.getElementById(id);
      elemquitado.remove();
      var elPrimero = document.getElementById("ParesO").childNodes[0];
     /*PAra evitar la coma adelante en el primer elemento que quede*/
     cont = elPrimero.getAttribute("id");
     Ntext = document.createTextNode(" ("+cont+") ");
     elPrimero.replaceChild(Ntext, elPrimero.childNodes[0]);
    }

  }

/*#######################################################################################*/
/*#######################################################################################*/
/*#######################################################################################*/


	function botonesCargaMatriz(){

		var boton = document.createElement("INPUT");
		boton.type="button";
		boton.value="Mostrar Atributos";
		boton.onclick=function(){
							if(CargoDatos(MatrizDatos())){
								resultadosRelaciones();
								resultadosFunciones();
							}else{
								debesCargarAlMenos();
							}

			};
		document.getElementById("BotonMostrar").appendChild(boton); 

		/*Boton para limpiar y cargar una nueva*/
		var botonReiniciar = document.createElement("INPUT");
		botonReiniciar.type="button";
		botonReiniciar.value="Reiniciar";
		botonReiniciar.id = "btnReiniciar";
		botonReiniciar.onclick=function(){reiniciarMatriz()};
		document.getElementById("conf").appendChild(botonReiniciar); 
		bloquearConfig();

	}

	function bloquearConfig(){
		document.getElementById("cantidad").disabled = true;
		document.getElementById("btn_agregar").disabled = true;

	}

	function desbloquarConf(){
		document.getElementById("cantidad").disabled = false;
		document.getElementById("btn_agregar").disabled = false;
		document.getElementById("cantidad").value = "";
	}

	function reiniciarMatriz(){
		var casillas = document.getElementById("grilla");
   		while (casillas.hasChildNodes()) {
      		casillas.removeChild(casillas.firstChild);
   		}
   		var boton = document.getElementById("BotonMostrar");
   		while (boton.hasChildNodes()) {
      		boton.removeChild(boton.firstChild);
   		}
   		
		quitarPropiedades();
   	document.getElementById("btnReiniciar").remove();
   		//document.getElementById("error").remove();
   	desbloquarConf();
    document.getElementById("RelacionAxA").innerHTML="";
	}


	/*Funcion que sirve para que no se duplique el cuadro de propiedades y resultados*/
	function quitarPropiedades(){
		var resultadosRelaciones = document.getElementById("ResultadosRelaciones");
   		while (resultadosRelaciones.hasChildNodes()) {
      		resultadosRelaciones.removeChild(resultadosRelaciones.firstChild);
   		}
   		var resultadosFunciones = document.getElementById("ResultadosFunciones");
   		while (resultadosFunciones.hasChildNodes()) {
      		resultadosFunciones.removeChild(resultadosFunciones.firstChild);
   		}

   		var error = document.getElementById("error");
   		while (error.hasChildNodes()) {
      		error.removeChild(error.firstChild);
   		}
   		//document.getElementById("error").remove();
	}

  	function cambioValoryColor(valor, id){
  		if (valor == 0){
  			document.getElementById(id).value ="1";
  			document.getElementById(id).style.backgroundColor="red";
  		}else{
  			document.getElementById(id).value ="0";
  			document.getElementById(id).style.backgroundColor="white";
  		}
  		
  	}




  	/*
###############################################################
################# Tabla con propiedades de relaciones  ########
###############################################################
*/
function resultadosRelaciones(){
  	
      	var tabla = "<table border=1 width=100%><thead><tr><th colspan=2>Relación</th></tr></thead>";
      	tabla += "<tr> <td>Reflexiva:</td><td>";
      	if(esReflexiva(MatrizDatos())){
        	tabla += "<span style='color:green;'>&#10004;</span>";
      	}else{
        	tabla += "<span style='color:red;'>&#10008;</span>";
      	}

    	tabla += "<tr> <td>Simétrica:</td><td>";
    	if(esSimetrica(MatrizDatos())){
       		tabla += "<span style='color:green;'>&#10004;</span>";
    	}else{
        	tabla += "<span style='color:red;'>&#10008;</span>";
    	}
      
   		tabla += "<tr> <td>Transitiva:</td><td>";
	if(puedoEvaluarTransitiva(MatrizDatos())){
    		if(esTransitiva(MatrizDatos())){
        		tabla += "<span style='color:green;'>&#10004;</span>";
    		}else{
        		tabla += "<span style='color:red;'>&#10008;</span>";
    		}
	}else{
		tabla += "<span>&#10134;</span>";
	}

    	tabla += "</td></tr></table>"
    	document.getElementById("ResultadosRelaciones").innerHTML = tabla
	




	}


/*
###############################################################
################# Tabla con propiedades de funciones  ########
###############################################################
*/

 function resultadosFunciones(){
      var tabla = "<table border=1 width=100%><thead><tr><th colspan=2>Función</th></tr></thead>";
      tabla += "<tr> <td>Función:</td><td>";
      if(esFuncion(MatrizDatos())){
        tabla += "<span style='color:green;'>&#10004;</span>";
      }else{
        tabla += "<span style='color:red;'>&#10008;</span>";
      }

      tabla += "<tr> <td>Inyectiva:</td><td>";
      if(esFuncion(MatrizDatos())){
        if(esInyectiva(MatrizDatos())){
          tabla += "<span style='color:green;'>&#10004;</span>";
        }else{
          tabla += "<span style='color:red;'>&#10008;</span>";
        }
      }else{
        tabla += "<span>&#10134;</span>";
      } 

      tabla += "<tr> <td>Sobreyectiva:</td><td>";
      if(esFuncion(MatrizDatos())){
        if(esSobreyectiva(MatrizDatos())){
          tabla += "<span style='color:green;'>&#10004;</span>";
        }else{
          tabla += "<span style='color:red;'>&#10008;</span>";
        }
      }else{
        tabla += "<span>&#10134;</span>";
      } 

      tabla += "</td></tr></table>"
      document.getElementById("ResultadosFunciones").innerHTML = tabla

    }

    function debesCargarAlMenos(){
    	document.getElementById("error").innerHTML ="<p>Debes cargar al menos una relación (Cliqueando en los ceros)</p>";
    }
