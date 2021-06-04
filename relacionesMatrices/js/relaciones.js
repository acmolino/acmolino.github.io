/*Funciones relativas a las relaciones de la matriz*/

function cuadradoR(matrix){
  		tot = matrix[0].length;
		var cuadrada = new Array(tot);
		for (i=0;i<tot;i++){
			cuadrada[i]= new Array(tot);			
		}
  		for(i=0; i<tot;i++){
           for(j=0; j<tot; j++){
             for (k=0; k<tot; k++){
                  //operaciones booleanas
                 cuadrada[i][j] = cuadrada[i][j]||(matrix[i][k]&&matrix[k][j]);
             }
           }
           
           
        
       }
      return cuadrada;
  	}



    /**
    *Evalua la reflexividad de la matriz
    *
    *
    */
	function esReflexiva(matrix){
		tot = matrix[0].length;		
      	for(i=0; i<tot;i++){
           	for(j=0; j<tot; j++){
              	if(i==j){
                  	if(matrix[i][j]=="0"){
                    	return false;
                  	}
              	}
           	}
       	}
	return true;
		
  	}

  	function esSimetrica(matrix){
  		tot = matrix[0].length;	
  		for(i=0; i<tot;i++){
           for(j=0; j<tot; j++){
               if(matrix[i][j]=="1"){
                   if(matrix[j][i]!="1"){
                    return false;
                   //return "No es simetrica";
                   }
               }
           }
          
       }
       return true;
      //return "Es simetrica";
  	}


	/*Trabajando*/
	function puedoEvaluarTransitiva(matrix){
		tot = matrix[0].length;
	
		/*Genero una matriz auxiliar para */
		var guardaPrimerElemento = new Array(tot);
		var guardaSegundoElemento = new Array(tot);
		/*for (i=0;i<tot;i++){
			guardaSegundoElemento[i]= new Array(tot);			
		}

		/*La cargo en 0*/
		for(i=0; i<tot;i++){
        			guardaSegundoElemento[i]=0;
				guardaPrimerElemento[i]=0;
			
		}
		for(i=0; i<tot;i++){
            		for(j=0; j<tot; j++){
				if (matrix[i][j] == "1"){
					/*Este ultimo control lo realizo para que no me evalue cuando hay un par reflexivo,
					pero que si lo tenga en cuanta, por eso vale 0,5.*/
					if (i==j){
						guardaPrimerElemento[i] = 0.5;
						guardaSegundoElemento[j] = 0.5;	
					}else{
						guardaPrimerElemento[i] = 1;
						guardaSegundoElemento[j] = 1;
					}
					
					
				} 			
			}
		}

		for(i=0; i<tot;i++){
			if((guardaPrimerElemento[i] + guardaSegundoElemento[i])>1){
				return true;			
			}				
		}

		return false;
  				
	}

  	function esTransitiva(matrix){
		
		tot = matrix[0].length;
  		/*
  		Lo cargo en auxiliar, porque invocando directamante a la 
  		funcion para hacer las comparaciones me da problema, ya que la reccorrida
  		carga y copara todo junto
  		*/
  		var aux = new Array(tot);
		for (i=0;i<tot;i++){
			aux[i]= new Array(tot);			
		}
      aux = cuadradoR(matrizABooleano(matrix));

  		for(i=0; i<tot;i++){
            		for(j=0; j<tot; j++){
                if ((aux)[i][j]==true){
                   if(matrix[i][j]!="1"){
                      return false;
                       //return "No es transitiva";
                   }
                }
                
            }
        }   
      return true;
      //return "Es transitiva";
  	}



/*Imprime la tabla de los resultados*/
   /* function resultadosRelaciones(){
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
      if(esTransitiva(MatrizDatos())){
        tabla += "<span style='color:green;'>&#10004;</span>";
      }else{
        tabla += "<span style='color:red;'>&#10008;</span>";
      }

      tabla += "</td></tr></table>"
      document.getElementById("ResultadosRelaciones").innerHTML = tabla

    }*/
