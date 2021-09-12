/**
 * @author Adrián Molino
 * 
 */ 

 //Ver linea 343

		//Variables y operadores
		const variablesYoperadores = [
		    { codigo: 8743, operador: '&&', tipo: 'conector' }, //0
		    { codigo: 8744, operador: '||', tipo: 'conector' }, //1
		    { codigo: 8594, operador: 'condicional', tipo: 'conector' }, //2 
		    { codigo: 8596, operador: 'bicondicional', tipo: 'conector' }, //3
		    { codigo: 8891, operador: 'xor', tipo: 'conector' }, //4
		    { codigo: 112, operador: 'p', tipo: 'variable' }, //5
		    { codigo: 113, operador: 'q', tipo: 'variable' }, //6
		    { codigo: 114, operador: 'r', tipo: 'variable' }, //7
		    { codigo: 115, operador: 's', tipo: 'variable' }, //8
		    { codigo: 40, operador: '(', tipo: 'parentesis' }, //9
		    { codigo: 41, operador: ')', tipo: 'parentesis' }, //10
		    { codigo: 172, operador: '!', tipo: 'negacion' } //11

		]; //Codigos de conectoers y variables

  	var tablaVisible = false;


		/**
		 *A partir de un String recibido del HTML arma la formula en un array
		 * El array contiendra objetos con la descripcion baisca necesaria de 
		 * cada elemento, por ejemplo, si es conectiva o variable. 
		 * 
		 * @param String cadena
		 * 
		 */
		function armarFormula(cadena) {
		    var formula = [];
		    for (var i = 0; i < cadena.length; i++) {
		        variablesYoperadores.filter(obj => {
		            if (obj.codigo === cadena.charCodeAt(i)) {
		                formula.push(obj);
		            }
		        })
		    }
		    //console.log(formula);
		    return formula;
		}

		/*####################################################################################################*/

		/**
		 * Recibe array con formula y lo valida
		 * 
		 * Realiza chequeos de no 
		 *  -tener 2 variables juntas
		 *  -que abran y cierren todos los parentesis
		 * 
		 * @param array Formula
		 * @return boolean 
		 */
		function chequearValidezFormula(formula) {
		    //Si empieza con conector está mal
		    if (formula[0].tipo == 'conector') {
		        return false;
		    }
		    //Si termina con conector está mal 
		    if (formula[formula.length - 1].tipo == 'conector') {
		        return false;
		    }

		    var contParentesis = 0;
		    var hayParentesis = false;
		    //
		    for (var i = 0; i < formula.length; i++) {
		        var sig = (i + 1);
		        if (sig <= (formula.length - 1)) {
		            if (formula[i].tipo == 'variable' && formula[sig].tipo == 'variable') {
		                return false;
		            }
		            if (formula[i].tipo == 'conector' && formula[sig].tipo == 'conector') {
		                return false;
		            }
		        }
		        //Contador de parentesis
		        if (formula[i].tipo == 'parentesis') {
		            //Si el primero es contador de parentesis
		            if (formula[i].codigo == 41 && !hayParentesis) {
		                return false;
		            }

		            if (formula[i].codigo == 40) {
		                contParentesis++;
		                hayParentesis = true;
		            }

		            if (formula[i].codigo == 41) {
		                contParentesis--;
		            }
		        } //Fin conteo de parenteis
		    } //Fin de la recorrida

		    if (hayParentesis && contParentesis > 0) {
		        return false;
		    }
		    return true;
		}

		/*####################################################################################################*/

		/**
		 * Asigna variables para estudio
		 * A partir de la formula, saca las variables existentes (sin repetir)
		 * 
		 * @param array Formula
		 * @return array variablesAsignadas
		 */
		function asignarVariables(formula) {
		    var variables = [];
		    for (var i = 0; i < formula.length; i++) {
		        if (formula[i].tipo === 'variable') {
		            if (!variables.includes(formula[i])) {
		                variables.push(formula[i]);
		            }
		        }
		    }
		    variables.sort((a, b) => (a.codigo > b.codigo) ? 1 : -1)
		    var variablesAsignadas = [];
		    for (var i = 0; i < variables.length; i++) {
		        variablesAsignadas.push(variables[i].codigo);
		    }
		    return variablesAsignadas;
		}

		/*####################################################################################################*/

		/**
		 * Quitar doble negacion
		 * 
		 * 
		 */ 
		 function quitarDobleNegacion(formula){
		 	for (var i = 0; i < formula.length; i++) {
		        if (formula[i].tipo == 'negacion') {
		        	if(formula[i+1].tipo == 'negacion'){
		        		formula.splice(i, 2);
		        	}
		        }
		      }
		    return formula;
		 }


		/*####################################################################################################*/

		/**
		 * Agregando parentesis
		 * 
		 * Recibe la formula y el ooperador (segun precedencia)
		 * para agregar parentesis y agrupar de forma correcta en caso de
		 * no existir los mismo
		 * 
		 * @param array formula
		 * @param int operador código del operador
		 * @return formula
		 */

		function agregaParentesis(formula, operador) {
				formula = quitarDobleNegacion(formula);
		    for (var i = 0; i < formula.length; i++) {
		        if (formula[i].codigo == operador) {
		            //Ver hacia la derecha
		            if (formula[i + 1].tipo == 'negacion'){
		              if (formula[i + 2].tipo == 'variable') {
		                formula.splice(i + 3, 0, variablesYoperadores[10]);
		              }
		              
		              if (formula[i + 2].codigo == 40) { //parentesis de apertura
		                for (var j = (i + 2); j < formula.length; j++) {
		                    if (formula[j].codigo == 41) { //Cuando encuentro el parentesis de cierre
		                        formula.splice(j+1, 0, variablesYoperadores[10]); //Agrego el otro cierre
		                        break;
		                    }
		                }
		              }
		            }else{
		              if (formula[i + 1].tipo == 'variable') {
		                formula.splice(i + 2, 0, variablesYoperadores[10]);
		              }
		              
		              if (formula[i + 1].codigo == 40) { //parentesis de apertura
		                for (var j = (i + 1); j < formula.length; j++) {
		                    if (formula[j].codigo == 41) { //Cuando encuentro el parentesis de cierre
		                        formula.splice(j, 0, variablesYoperadores[10]); //Agrego el otro cierre
		                        break;
		                    }
		                }
		              }
		            }
	

		            //Ver hacia la izquierda
		            if (formula[i - 1].tipo == 'variable') {
		            		if ((i - 2) >= 0 && formula[i - 2].tipo == 'parentesis') {
		            			if ((i - 3) >= 0 && formula[i - 3].tipo == 'negacion'){
		            				formula.splice(i - 3, 0, variablesYoperadores[9]); //Parenteis de apertura
		            			}else{
		            				formula.splice(i - 2, 0, variablesYoperadores[9]); //Parenteis de apertura
		            			}
		            		} else if ((i - 2) >= 0 && formula[i - 2].tipo == 'negacion') {
		                    formula.splice(i - 2, 0, variablesYoperadores[9]); //Parenteis de apertura
		                } else {
		                    formula.splice(i - 1, 0, variablesYoperadores[9]); //Parenteis de apertura
		                }


		            }

		            if (formula[i - 1].codigo == 41) { //parentesis de cierre
		                var contadorParentesis = 1;
		                for (var j = (i - 1); j >= 0; j--) {

		                    if (formula[j].codigo == 41) {
		                        contadorParentesis++;
		                    }
		                    if (formula[j].codigo == 40) {
		                        contadorParentesis--;
		                    }

		                    if (formula[j].codigo == 40 && contadorParentesis <= 1) { //cuando encuentro un parentesis de apertura
		                        if ((j - 1) >= 0 && formula[j - 1].tipo == 'negacion') {
		                            formula.splice(j - 1, 0, variablesYoperadores[9]);
		                        } else {
		                            formula.splice(j, 0, variablesYoperadores[9]);
		                        }
		                    }
		                }
		            }
		            
		            
		            i++; //porque cuando agrego un parentesis, quedo corrido, y me veulve a entrar
		            //i=0;
		        } //Fin de encontrar operador elegido
		    } //fin recorrida

		    console.log(formula);
		    return formula;
		} //fin de funcion

		/*####################################################################################################*/

		/**
		 * Sustitur XOR
		 * 
		 * Toma el o exclusivo y lo pasa a una negación del 
		 * bicondicional, para luego poder sacar el bicondicional con otra
		 * función.
		 * 
		 * @param array formula 
		 * @return array formula 
		 */
		function sustituirXOR(formula) {
				formula =  quitarDobleNegacion(formula);
		    for (var i = 0; i < formula.length; i++) {
		        if (formula[i].operador == 'xor') {
		            formula.splice(i, 1, variablesYoperadores[3]); //Operador biCondicional

		            //Primero me fijo si no tiene parentesis a su derecha
		            if (formula[(i + 1)].operador != '(') {
		                formula.splice(i + 2, 0, variablesYoperadores[10]); //parentesis de cierre
		            } else {
		                for (var j = i; j < formula.length; j++) {
		                    if (formula[j].codigo == '41') {
		                        formula.splice(j, 0, variablesYoperadores[10]); //parentesis de cierre
		                        break;
		                    }
		                } //Fin recorrida inversa busqueda de inicio parentesis
		            }

		            //Manejo la negación previa
		            if ((i - 1) >= 0 && formula[(i - 1)].operador != ')') {
		                formula.splice(i - 1, 0, variablesYoperadores[9]); //parentesis de apertura
		                formula.splice(i - 1, 0, variablesYoperadores[11]); //negación
		            } else {
		                for (var j = i; j >= 0; j--) {
		                    if (formula[j].codigo == '40') {
		                        formula.splice(j, 0, variablesYoperadores[9]); //parentesis de apertura
		                        formula.splice(j, 0, variablesYoperadores[11]);
		                        break;
		                    }
		                } //Fin recorrida inversa busqueda de inicio parentesis
		            }


		        } //Fin if XOR
		    }
		    //console.log(formula);
		    return formula;
		}

		/*####################################################################################################*/

		/**
		 * Sustituir BiCondicional
		 * 
		 * La funcion recibe una formula que puede o no tener un bicondicional.
		 * En caso de tenerlo opera para convertirlo.
		 * p<->q = (p->q)&(q->p)
		 * Verifica si los terminos tienen parentesis en forma de proposicion compuesta
		 * para mantener la relacion.
		 *
		 * @param array formula
		 * @return array formula sin el bicondcional 
		 */
		function quitarBiCondicional(formula) {
				formula = quitarDobleNegacion(formula);
		    for (var i = 0; i < formula.length; i++) {
		        if (formula[i].operador == 'bicondicional') {
		            var elementosAquitarIzq = 0; //Para saber hasta donde tengo que sustituir
		            var elementosAquitarDer = 0;

		            var variable1 = []; //Un array con ese pedazo de formula
		            var variable2 = []; //Un array con ese pedazo de formula

                //Hacia la izquierda <<-
		            //Cuendo aparece parentesis antes del operador
		            if (formula[(i - 1)].codigo == '41') { //Me fijo si hay parentesis de cierre
		                var contadorParentesisCierre = 1;
		                for (var j = (i - 2); j >= 0; j--) {

		                    if (formula[j].codigo == '41') {
		                        contadorParentesisCierre++;
		                    }
		                    if (formula[j].codigo == '40') {
		                        contadorParentesisCierre--;
		                    }

		                    if (formula[j].codigo == '40' && contadorParentesisCierre < 1) {
		                        var b = j;
		                        if ((j - 1) >= 0 && formula[j - 1].codigo == '172') { //TRABAJANDO para solucionar la negacion
		                            b = j - 1;
		                            //elementosAquitarIzq++;  //Ver que pasa con esto
		                        }
		                        for (var h = (i-1); h >= b; h--) {
		                            variable1.push(formula[h]);
		                            elementosAquitarIzq++;
		                        }
		                        break;
		                    }
		                } //Fin de recorrida dentro de los parentesis
		            } else {
		                variable1.push(formula[(i - 1)]);
		                elementosAquitarIzq++;
		                /*if(formula[(i - 2)].codigo == '40'){
		                	elementosAquitarIzq++;
		                }*/
		                //elementosAquitarIzq+=2; //Revisar y hacer mas pruebas
		                //Falta ver si ademas es una negacion que aparece
		            }

		            variable1.reverse(); //Debo invertirla

                //Hacia la derecha ->>
                //3 opciones 
                  // negacion 
                      //variable 
                      //parentesis
                  // variable 
                  // parentesis
                  
                //Analiso negacion que puede bifurcar en las otras dos  
                var n = i+1;
                if(formula[n].tipo == 'negacion'){
                  variable2.push(formula[(n)]);
                  elementosAquitarDer++;
                  n++;
                  //console.log("Entra");
            
                }
		            //Cuendo aparece parentesis despues del operador
		            if (formula[n].codigo == '40') { //Me fijo si hay parentesis de apertura
		                var contadorParentesisCierre = 1;
		                for (var j = (n + 1); j < formula.length; j++) {
		                	//console.log(contadorParentesisCierre);

		                    if (formula[j].codigo == '40') {
		                        contadorParentesisCierre++;;
		                    }
		                    if (formula[j].codigo == '41') {
		                        contadorParentesisCierre--;;
		                    }

		                    if (formula[j].codigo == '41' && contadorParentesisCierre < 1) {
		                        for (var h = (i + 1); h <= j; h++) { //Ver si debe ser n o i
		                            variable2.push(formula[h]);
		                            elementosAquitarDer++;
		                        }
		                        break;
		                    }
		                }
		            } else {
		                variable2.push(formula[(n)]);
		                elementosAquitarDer++;
		            }

		            elementosAquitar = elementosAquitarIzq + elementosAquitarDer;
		            formula.splice(i, 1); //Elimino ese operador bicondicional

		            /*---------------------------------------------------------------------------------------------*/
		            //Armo un array con la nueva formla donde tengos los dos condcionales con 
		            var nuevaFormCompletaSinBi = [];
		            //nuevaFormCompletaSinBi.push(variablesYoperadores[9]);

		            nuevaFormCompletaSinBi.push(variablesYoperadores[9]); //Parentsis apertura elemento izquierda
		            for (var x = 0; x < variable1.length; x++) { //Variable 1
		                nuevaFormCompletaSinBi.push(variable1[x]);
		            }
		            nuevaFormCompletaSinBi.push(variablesYoperadores[2]); //Condicional
		            for (var x = 0; x < variable2.length; x++) { //Variable 2
		                nuevaFormCompletaSinBi.push(variable2[x]);
		            }
		            nuevaFormCompletaSinBi.push(variablesYoperadores[10]); //Parentsis cierre elemento izquierda

		            nuevaFormCompletaSinBi.push(variablesYoperadores[0]); //Conjuncion

		            nuevaFormCompletaSinBi.push(variablesYoperadores[9]); //Parentsis apertura elemento derecgha
		            for (var x = 0; x < variable2.length; x++) { //Variable 2
		                nuevaFormCompletaSinBi.push(variable2[x]);
		            }
		            nuevaFormCompletaSinBi.push(variablesYoperadores[2]); //Condicional
		            for (var x = 0; x < variable1.length; x++) { //Variable 1
		                nuevaFormCompletaSinBi.push(variable1[x]);
		            }
		            nuevaFormCompletaSinBi.push(variablesYoperadores[10]); //Parentsis cierre elemento derecha

		            //nuevaFormCompletaSinBi.push(variablesYoperadores[10]);
		            //console.log(nuevaFormCompletaSinBi);
		            /*---------------------------------------------------------------------------------------------*/

		            var posicionArranqueArray = i - elementosAquitarIzq;

		            formula.splice(posicionArranqueArray, elementosAquitar); //Elimino todo lo anterior
		           // console.log(formula);
		           // return false;

		            //Adjunto la formula sin el bicondicional al resto de la formula
		            for (var y = 0; y < nuevaFormCompletaSinBi.length; y++) {
		                formula.splice(posicionArranqueArray, 0, nuevaFormCompletaSinBi[y]);
		                posicionArranqueArray++;
		            }

		            i = 0; //Recorro nuevamante desde 0 en caso de haber encontrado
		        } //Fin de operador bicondicional
		    } //Fin de recorrida de formula

		    //console.log(formula);
		    return formula;
		}

		/*####################################################################################################*/


		/**
		 * Sustituir condicional
		 * 
		 * Vemos si existe condicional y sustitimos p->q por (-p v q)
		 * Verificamos tambien la posibilidad de formula con parenteis
		 * para plicar este cambio
		 * 
		 * @param array Formula
		 * @return array formula sin condicional
		 */
		function quitarCondicional(formula) {
				formula = quitarDobleNegacion(formula); //Para qu no interfiera
		    for (var i = 0; i < formula.length; i++) {
		        if (formula[i].operador == 'condicional') {
		            var inicio = i
		            var fin = i;

		            formula.splice(i, 1, variablesYoperadores[1]); //Operador OR

		            //Estudio del consecuente
		            var b = (i + 1);
		            if (formula[b].tipo == 'negacion') {
		                b++;
		            }
		            //Si empieza por parentesis o negacion debo rodearlos como correposnde con parentesis	
		            if (formula[b].tipo == 'parentesis') {
		                var contadorParentesis = 1;
		                var j = b + 1;
		                while (contadorParentesis > 0 /*&& j < formula.length*/) {
		                    if (formula[j].codigo == '40') {
		                        contadorParentesis++;
		                    }
		                    if (formula[j].codigo == '41') {
		                        contadorParentesis--;
		                    }
		                    j++;
		                    fin++;
		                } //Fin de bucle
		            } else {
		                fin = b + 1;
		            } //Fin decon dicion parenteis derecha

		            
		            //Analisis a la izquierda del operador (antecedente)
		            if (formula[(i - 1)].tipo != 'parentesis') {
		                formula.splice(i - 1, 0, variablesYoperadores[11]); //Operador negación
		                inicio = i-1;
		                fin++; //Como agergue negacion y parenteisi, sumo al fin
		                if(formula[(i - 2)].tipo == 'negacion'){inicio--;} //En caso de que fuera una negacion, no agrego parenteis aun
		            } else {
		                var contadorParentesis = 0;
		                for (var j = i; j >= 0; j--) {
		                    if (formula[j].codigo == '41') {
		                        contadorParentesis++;
		                    }
		                    if (formula[j].codigo == '40') {
		                        contadorParentesis--;
		                    }
		                    //console.log(contadorParentesis);

		                    if (formula[j].codigo == '40' && contadorParentesis < 1) {
		  
		                        //Si el parentesis esta antecedido por una negacion
		                        //la contemplo para el armado de la parentisación
		                        if ((j - 1) >= 0 && formula[(j - 1)].codigo == '172') {
		                            inicio--;
		                        }
		                        formula.splice(j, 0, variablesYoperadores[11]); //Operador negación
		                        fin++;
		                        break;
		                    }
		                    inicio--; //Tira el inicio más atras
		                } //Fin recorrida inversa busqueda de inicio parentesis
		            }

		            formula.splice(fin + 1, 0, variablesYoperadores[10]); //Agrego parentesisi de cierre
		            formula.splice(inicio, 0, variablesYoperadores[9]); //Agrego parentesis de apertura

		            i = 0; //Vuelva a realizar la recorrida por si hubo algun corrimiento

		        } //Fin de condicion cuando encuentra el condicional

		    }
		    //console.log("Luego de condicional");
		    //console.log(formula);
		    return formula;
		}


		/*####################################################################################################*/

		/**
		 * Carga en cada variable sus posibles valores de verdad
		 * 
		 * @param array formula Array con objetos de detalles de cada elemento
		 * @param array variablesAsignadas 
		 * @param array tabla Valores de verdad generados en forma de tabla
		 * 
		 * @return array formula
		 */
		function cargarValoresDeVerdadEnFormula(formula, variablesAsignadas, tabla) {
		    var filas = Math.pow(2, variablesAsignadas.length);
		    for (var i = 0; i < filas; i++) {
		        for (var j = 0; j < formula.length; j++) {
		            if (formula[j].tipo == 'variable') {
		                for (var h = 0; h < variablesAsignadas.length; h++) {
		                    if (variablesAsignadas[h] == formula[j].codigo) {
		                        formula[j].operador = tabla[h]; //Asigno dentro de la formula los posibles valores para la variable
		                    }
		                }
		            }
		        }
		    }
		    return formula;
		}

		/*####################################################################################################*/

		/**
		 * Arma las operacions finales
		 * 
		 * @param array formula Array con los operadores y valores de variables 
		 * @param int Cantidad de variables usadas
		 * 
		 * @return array lineas do codigo prontas para evaluar
		 */
		function armarOperaciones(formula, cantVariable) {
		    var filas = Math.pow(2, cantVariable);
		    var lineasCodigo = [];
		    for (var i = 0; i < filas; i++) {
		        var linea = "";
		        for (var j = 0; j < formula.length; j++) {
		            if (formula[j].tipo == 'variable') {
		                linea += formula[j].operador[i];
		            } else {
		                linea += formula[j].operador;
		            }
		        }
		        lineasCodigo.push(linea);
		    }
		    return lineasCodigo;
		}

		/*####################################################################################################*/

		/**
		 * A partir de las variable a utilizar genera una matriz con las posibles
		 * variables booleanas
		 * 
		 * @param int cantVar
		 * 
		 */
		function generarTabla(cantVar, tipo) {
		    var col = cantVar; //Las columnas de la tabla de verdad. Cada columnas será una posicion en el array
		    var filas = Math.pow(2, cantVar); //Filas que va a tener
		    var procesar = 1; //variable auxiliar para repeticion de valores booleanos

		    var tabla = []; //El array que representará la tabla

		    for (var i = 0; i < col; i++) {
		        var filaValores = []; //Fila momentanea;
		        filas = filas / 2;

		        for (var h = 0; h < procesar; h++) {
		            for (var j = 0; j < filas; j++) {
				if(tipo == 'VF'){filaValores.push(true);}
				if(tipo == '01'){filaValores.push(false);}
		            }
		            for (var j = 0; j < filas; j++) {
		                if(tipo == 'VF'){filaValores.push(false);}
				if(tipo == '01'){filaValores.push(true);}
		            }
		        }

		        procesar = procesar * 2;
		        tabla.push(filaValores);
		    }

		    return tabla;

		}

		/*####################################################################################################*/


		/*####################################################################################################*/


		/**
		 * Genera la tabla HTML visible
		 * 
		 * Recibe el arrray con las variables que se van a manejar (previemente depuradas)
		 * Recibe una matriz con las combinacioes de valores
		 * Recibe un array con los resultados de las operacionesz
		 * 
		 * @param array variables
		 * @param array tabla con valores de verdad 
		 * @param array resultados
		 * 
		 * 
		 */
		function armarTablaHTML(variables, tabla, resultados, formato) {
		    $('#tabla').empty();
		    $('#errorHandling').empty();

		    var filaCabezal = $('#tabla').append('<tr>');
		    for (var i = 0; i < variables.length; i++) {
		        filaCabezal.append('<th>&#' + variables[i] + '</th>');
		    }
		    filaCabezal.append('<th>Resultado</th>');

		    for (var i = 0; i < tabla[0].length; i++) {
		        var filaValores = "<tr>";
		        for (var j = 0; j < variables.length; j++) {
			var muestra = '';
		            if(formato == 'VF'){muestra = 'F';}
			    if(formato == '01'){muestra = '0';}
		            if (tabla[j][i]) {
		                if(formato == 'VF'){muestra = 'V';}
			    	if(formato == '01'){muestra = '1';}
		            }

		            //filaValores.append('<td style="border-bottom: 1px solid">'+muestra+'</td>');
		            filaValores += '<td style="border-bottom: 1px solid">' + muestra + '</td>';

		        }
		        var res = '';
      			if(formato == 'VF'){res = 'F';}
      			if(formato == '01'){res = '0';}
      		        if (eval(resultados[i])) { 
      				if(formato == 'VF'){res = 'V';}
      				if(formato == '01'){res = '1';}
      			}
		        //filaValores.append('<td style="border-bottom: 1px solid">'+res+'</td>');
		        filaValores += '<td style="border-bottom: 1px solid">' + res + '</td>';
		        filaValores += '</tr>';
		        $('#tabla').append(filaValores);
		    }


		}

		/*####################################################################################################*/

		function cargarCaracterEnCasilla(codigo) {
		    $('#visor').append(codigo);
		    //console.log($('#visor').text().length);
		}

		function limpiarVisor() {
		    $('#visor').empty();
		    $('#tabla').empty();
		    $('#errorHandling').empty();
		}

		function mensajeDeErrorFormula() {
		    $('#tabla').empty();
		    var msj = $('#errorHandling').append("<div class='alert alert-danger' role='alert'>Error en la formulación!</div>");
		}
		
		function checkearFormaDeMostrar(){
		  if($('#chk01VF').prop('checked')){
		    return '01'
		  }else{
		    return 'VF';
		  }
		}
		
		$("#chk01VF").change(function() {
      
    });

		/*####################################################################################################*/

		/**
		 * Agrupa funciones para el proceso principal
		 * 
		 * @param array formula
		 * 
		 */
		function procesarTabla(formula) {
  		  var tipo = checkearFormaDeMostrar();
  		  var arrayFormula = armarFormula(formula); //Array con la formula
		    if (chequearValidezFormula(arrayFormula)) {
		        //console.log("valida");
		        var varTitulos = asignarVariables(arrayFormula); //Cabeceras - Variables totales existentes
		        
			      var arrayTabla = generarTabla(varTitulos.length, tipo);

		        var formulaCargada = cargarValoresDeVerdadEnFormula(arrayFormula, varTitulos, arrayTabla);

            //Armo todos los parentesis basandome en precedencia de operadores
		        var formParentesiConjuntivos = agregaParentesis(formulaCargada, 8743); //Agrega parentesis a la conjunción
		        var formParentesisDistuntivos = agregaParentesis(formParentesiConjuntivos, 8744); //Agrega parentesis a la disyunción
		        var formParentesisDistuntivosExcl = agregaParentesis(formParentesisDistuntivos, 8891); //XOR
		        var formParentesisFinal = agregaParentesis(formParentesisDistuntivosExcl, 8594); //Agrega parentesis a condicional

		        //El bicondicional ya no lo hago porque lo soluciona la propia funcion
	
		        //
		        

		        //Solucionamos el XOR, el bicondiciona y el condicional
		        //En los tres casos respeta el armado de parentesis, evitrando perder el orden
		        var formNorm = quitarCondicional(quitarBiCondicional(sustituirXOR(formParentesisFinal)));

		        /*var formSinBi = quitarBiCondicional(formParentesisFinal);
		        console.log(formSinBi);*/

		        //console.log(formParentesisFinal);
		        var formulas = armarOperaciones(formNorm, varTitulos.length);

		        //Generamos la tabla HTML
		       
			armarTablaHTML(varTitulos, arrayTabla, formulas, tipo);

		    } else {
		        mensajeDeErrorFormula();
		        console.log("Error de formulacion");
		    }

		    //console.log(arrayTabla);

		}
