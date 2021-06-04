	function esFuncion(matrix){
  		tot = matrix[0].length;	
        for(i=0; i<tot;i++){
            cont = 0;
            for(j=0; j<tot; j++){  
                if(matrix[i][j]=="1"){
                   cont++;
                }
               
            }
            if(cont>1){
                return false;
            }
         }
            
            return true;
  	}


  	function esInyectiva(matrix){
  		tot = matrix[0].length;
  		temp = new Array(tot);
       for(i=0; i<tot;i++){
            for(j=0; j<tot; j++){  
                if(matrix[i][j]=="1"){
                  for(k=0; k<tot;k++){
                      if(temp[k]==j){
                      	return false;
                          
                      }
                  }
                  temp[i]=j; 
                }
               
            }
            
         }
         return true;
       
  	}

  	function esSobreyectiva(matrix){
  		tot = matrix[0].length;
  		temp=0;
      	for(i=0; i<tot;i++){
          	temp = 0;
            for(j=0; j<tot; j++){
                if(matrix[i][j]=="1"){
                    temp++;
                }
            }
           if(temp==0){
               return false;
               //return "No es Sobreyectiva";
           } 
      }
      //return "Es Sobreyectiva";      
      return true;
  	}


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