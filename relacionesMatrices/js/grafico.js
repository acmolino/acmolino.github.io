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
	}


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

  	function CargoDatos(matrix){
		tot = matrix[0].length;
  		for(i=0; i<tot;i++){
			for(j=0; j<tot; j++){
				
				if(matrix[i][j]=="1"){
					return true;
				}
				
			}
		}
		return false;
  	}



function TablaRelaciones(matrix){
     
      /*Limpio la tabla*/
      orden = matrix[0].length;
      var casillas = document.getElementById("grilla");
      while (casillas.hasChildNodes()) {
          casillas.removeChild(casillas.firstChild);
      }
      
      /*Imprimo la tabla*/
      var tabla = document.createElement("TABLE");
      tabla.setAttribute("id", "tablaR");
      document.getElementById("grilla").appendChild(tabla);

      for(i=0; i<orden;i++){
        var fila = document.createElement("TR");
        fila.setAttribute("id", "tr-"+i);
        document.getElementById("tablaR").appendChild(fila);
          for(j=0; j<orden; j++){
                var celda = document.createElement("TD");
                celda.setAttribute("id", "td-"+i+""+j);
                celda.style.border="0";
                var valor = matrix[i][j];
                if(valor == "1"){
                  celda.style.fontWeight = "bold";
                }
              var contenido = document.createTextNode(valor);
              celda.appendChild(contenido);
              document.getElementById("tr-"+i).appendChild(celda);

        
          }
      }
      return matrix;
  }


    


/*
###############################################################
################# Tabla con propiedades de relaciones  ########
###############################################################
*/
function resultadosRelaciones(){
  	
      	var tabla = "<table border=1 width=100%><thead><tr><th colspan=2>Relaci??n</th></tr></thead>";
      	tabla += "<tr> <td>Reflexiva:</td><td>";
      	if(esReflexiva(MatrizDatos())){
        	tabla += "<span style='color:green;'>&#10004;</span>";
      	}else{
        	tabla += "<span style='color:red;'>&#10008;</span>";
      	}

    	tabla += "<tr> <td>Sim??trica:</td><td>";
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
      var tabla = "<table border=1 width=100%><thead><tr><th colspan=2>Funci??n</th></tr></thead>";
      tabla += "<tr> <td>Funci??n:</td><td>";
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
    	document.getElementById("error").innerHTML ="<p>Debes cargar al menos una relaci??n (Cliqueando en los ceros)</p>";
    }



/**/

      function tablaEleccionPropiedades(){
      	var tabla = "<table border=1 width=100%><thead><tr><th colspan=2>Relaci??n</th></tr></thead>";
      	tabla += "<tr id='FilaReflexiva'> <td>Reflexiva:</td>";
     		tabla += "<td><select id='cboreflexiva'>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no' selected>NO</option>";
     		/*tabla += "<option value='nada' >-</option>";*/
     		tabla += "</select></td>";

    		tabla += "<tr id='FilaSimetrica'> <td>Sim??trica:</td>";
   			tabla += "<td><select id='cbosimetrica'>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no' selected>NO</option>";
     		/*tabla += "<option value='nada' >-</option>";*/
     		tabla += "</select></td>";
      
     		tabla += "<tr id='FilaTransitiva'> <td>Transitiva:</td>";
	      	tabla += "<td><select id='cboTransitiva'>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no'>NO</option>";
     		tabla += "<option value='nada' selected>-</option>";
     		tabla += "</select></td>";



      tabla += "</tr></table>"
      document.getElementById("EleccionProp").innerHTML = tabla

      }
      
      function tablaEleccionFuncion(){
      	var tabla = "<table border=1 width=100%><thead><tr><th colspan=2>Funci??n</th></tr></thead>";
      	tabla += "<tr> <td>Funci??n:</td>";
     		tabla += "<td><select>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no'>NO</option>";
     		tabla += "<option value='nada' selected>-</option>";
     		tabla += "</select></td>";

    		tabla += "<tr> <td>Inyectiva:</td>";
   			tabla += "<td><select>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no'>NO</option>";
     		tabla += "<option value='nada' selected>-</option>";
     		tabla += "</select></td>";
      
     		tabla += "<tr> <td>Sobreyectiva:</td>";
	      	tabla += "<td><select>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no'>NO</option>";
     		tabla += "<option value='nada' selected>-</option>";
     		tabla += "</select></td>";



      tabla += "</tr></table>"
      document.getElementById("EleccionFunc").innerHTML = tabla

      }


/**/

  function CargarRespuestasRelaciones(){

    var respuestasRelaciones = new Array(3);
    for(i=0; i<3; i++){
      respuestasRelaciones[i] = false;
      
    }
    if(document.getElementById("cboreflexiva").value == "si"){
      respuestasRelaciones[0] = true;
    }
    if(document.getElementById("cbosimetrica").value == "si"){
      respuestasRelaciones[1] = true;
    }
    if(document.getElementById("cboTransitiva").value == "si"){
      respuestasRelaciones[2] = true;
    }
    return respuestasRelaciones;
  }


function botonComprobaciones(matrix){
  viejo = document.getElementById("botonComprobacion");
  if(viejo.hasChildNodes){
      viejo.removeChild(viejo.firstChild);
  }
	var boton = document.createElement("INPUT");
	boton.type="button";
	boton.value="Comprobar Respuestas";
	boton.onclick=function(){
                          darResultados(matrix, CargarRespuestasRelaciones());
                        };
	document.getElementById("botonComprobacion").appendChild(boton); 

}

/*PENDIENTEEEEEEEEEEEE*/
  function CargarRespuestasFunciones(){

  }

/*PENDIENTEEEEEEEEEEEE*/
  function resultadosRespuestasRelaciones(matrix, respuestasR){
  	//alert(matrix[0]);
       var respuestasCorrectasRelaciones = new Array(3);
	     respuestasCorrectasRelaciones[0] = esReflexiva(matrix);
	     respuestasCorrectasRelaciones[1] = esSimetrica(matrix);
	     respuestasCorrectasRelaciones[2] = esTransitiva(matrix);


      for(i=0; i<3; i++){
      	if (respuestasCorrectasRelaciones[i] == respuestasR[i]){
        	respuestasCorrectasRelaciones[i] = true;
       }
      }
     // alert(respuestasCorrectasRelaciones[0]);
	return respuestasCorrectasRelaciones;
  }

/*Trabajando*/
function darResultados(matrix, respuestasR){
	rowRef = document.getElementById("FilaReflexiva");
	var RespuestaRel = rowRef.insertCell(2);
	if(resultadosRespuestasRelaciones(matrix, respuestasR)[0]){  
		RespuestaRel.innerHTML= "<span style='color:green;'>&#10004;</span>";
	}else{
		RespuestaRel.innerHTML= "<span style='color:red;'>&#10008;</span>";
	}


	rowSim = document.getElementById("FilaSimetrica");
	var RespuestaSim = rowSim.insertCell(2);
	if(resultadosRespuestasRelaciones(matrix, respuestasR)[1]){  
		RespuestaSim.innerHTML= "<span style='color:green;'>&#10004;</span>";
	}else{
		RespuestaSim.innerHTML= "<span style='color:red;'>&#10008;</span>";
	}

	rowTran = document.getElementById("FilaTransitiva");
	var RespuestaTran = rowTran.insertCell(2);
	if(resultadosRespuestasRelaciones(matrix, respuestasR)[2]){  
		RespuestaTran.innerHTML= "<span style='color:green;'>&#10004;</span>";
	}else{
		RespuestaTran.innerHTML= "<span style='color:red;'>&#10008;</span>";
	}

}
