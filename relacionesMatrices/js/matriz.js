	function MatrizDatos() {
		cant = document.getElementById("cantidad").value; 
		var matriz = new Array(cant);
		for (i=0;i<cant;i++){
			matriz[i]= new Array(cant);			
		}

		k=1;

		for(i=0; i<cant;i++){
			for(j=0; j<cant; j++){
				//matriz[i][j] = document.getElementById("grilla").childNodes[k].value;
				matriz[i][j] = document.getElementById(i+""+j).value;
				//Con k recorro el array que supone los ChildNodes
				k++;
			}
			//Agrego a k, para que no tome el elemento BR (salto de linea)
			k++;
		}

		return matriz;
	}

	function matrizABooleano(matrix){
		//declaro una nueva matriz
		tot = matrix[0].length;
		var matrizB = new Array(tot);
		for (i=0;i<tot;i++){
			matrizB[i]= new Array(tot);			
		}
		
		for(i=0; i<tot;i++){
			for(j=0; j<tot; j++){
				if(matrix[i][j]=="0"){matrizB[i][j]=false;}
				if(matrix[i][j]=="1"){matrizB[i][j]=true;}
			}
		}

		return matrizB;

	} 

	/*Procediimento para cargar aleatoriamente matriz para ejercicios*/
	function datosAleatorios(orden){
		var matriz = new Array(orden);
		for (i=0;i<orden;i++){
			matriz[i]= new Array(orden);			
		}

		for(i=0; i<orden;i++){
			for(j=0; j<orden; j++){
				matriz[i][j] = Math.round(Math.random(0,2));
			}
		}

		return matriz;
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


