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


/**/

      function tablaEleccionPropiedades(){
      	var tabla = "<table border=1 width=100%><thead><tr id='cabezalRelaciones'><th colspan=2>Relación</th></tr></thead>";
      	tabla += "<tr id='FilaReflexiva'> <td>Reflexiva:</td>";
     		//tabla += "<td><select id='cboreflexiva'>";
        tabla += "<td><input type='checkbox' id='chkReflexiva' style='width:20px; height:20px;'></td>"

    		tabla += "<tr id='FilaSimetrica'> <td>Simétrica:</td>";
        tabla += "<td><input type='checkbox' id='chkSimetrica' style='width:20px; height:20px;'></td>"
  
     		tabla += "<tr id='FilaTransitiva'> <td>Transitiva:</td>";
        tabla += "<td><input type='checkbox' id='chkTransitiva' style='width:20px; height:20px;'></td>"

      tabla += "</tr></table>"
      document.getElementById("EleccionProp").innerHTML = tabla

      }
      
      function tablaEleccionFuncion(){
      	var tabla = "<table border=1 width=100%><thead><tr><th colspan=2>Función</th></tr></thead>";
      	tabla += "<tr> <td>Función:</td>";
     		tabla += "<td><select>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no'>NO</option>";
     		tabla += "<option value='nada' selected>-</option>";
     		tabla += "</select></td>";

    		tabla += "<tr> <td>Inyectiva:</td>";
   			tabla += "<td><select>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no'>NO</option>";
     		tabla += "<option value='nulo' selected>-</option>";
     		tabla += "</select></td>";
      
     		tabla += "<tr> <td>Sobreyectiva:</td>";
	      	tabla += "<td><select>";
     		tabla += "<option value='si'>SI</option>";
     		tabla += "<option value='no'>NO</option>";
     		tabla += "<option value='nulo' selected>-</option>";
     		tabla += "</select></td>";



      tabla += "</tr></table>"
      document.getElementById("EleccionFunc").innerHTML = tabla

      }


/**/

  /*Caraga en Array resultado de true or false dependiendo de la eleccion*/
  function CargarRespuestasRelaciones(){

    var respuestasRelaciones = new Array(3);
    for(i=0; i<3; i++){
      respuestasRelaciones[i] = false;
    //Debo poner y preguntar ==true en checked sino, no funciona 
    }
    if(document.getElementById("chkReflexiva").checked == true){
      respuestasRelaciones[0] = true;
    }
    if(document.getElementById("chkSimetrica").checked == true){
      respuestasRelaciones[1] = true;
    }

    if(document.getElementById("chkTransitiva").checked == true){
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
/*No verifica bien reflexiva*/
  function resultadosRespuestasRelaciones(matrix, respuestasR){
  	//alert(matrix[0]);
       var respuestasCorrectasRelaciones = new Array(3);
       var conclusion = new Array(3);
	     	respuestasCorrectasRelaciones[0] = esReflexiva(matrix);
	     	respuestasCorrectasRelaciones[1] = esSimetrica(matrix);
      		respuestasCorrectasRelaciones[2] = esTransitiva(matrix);
 

      for(i=0; i<3; i++){
      	conclusion[i] = false;
		if (respuestasCorrectasRelaciones[i] == respuestasR[i]){
        	conclusion[i] = true;
       	}
      }
     // alert(respuestasCorrectasRelaciones[0]);
	return conclusion;
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
