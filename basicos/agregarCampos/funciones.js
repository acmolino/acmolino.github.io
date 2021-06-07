var cantCamposHijos = 0;


		function agregarCampoHijos(){
			var contenedor = document.getElementById("contHijos");

			//Boton de agregar otro campo
			var botonAgregar = document.createElement("button");
			botonAgregar.innerHTML = "Agergar otro";
			botonAgregar.classList.add("btn");
			botonAgregar.classList.add("btn-success");
			botonAgregar.style.float = 'right';
			botonAgregar.onclick = function(){ agregarCampoHijos(); };

			if(cantCamposHijos == 0){
				contenedor.appendChild(botonAgregar);

			}

			var contInput = document.createElement("div");
			contInput.classList.add("input-group");
			contInput.id = "contInput"+cantCamposHijos+"";

			//Los input text
			var inputText = document.createElement("input"); //Elemento que agrego
			inputText.type = "text"; //tipo de input
			inputText.id = "txtHijo"+cantCamposHijos+"";
			inputText.classList.add("form-control");
			contInput.appendChild(inputText); //Agrego efectivamante
			

			//Boton de eliminar
			var contBoton = document.createElement("div");
			contBoton.classList.add("input-group-append");

			var botonQuitar = document.createElement("button");
			botonQuitar.innerHTML = "-";
			botonQuitar.id = cantCamposHijos;
			botonQuitar.classList.add("btn");
			botonQuitar.classList.add("btn-outline-secondary");
			botonQuitar.onclick = function(){ quitarHijo(this.id); };
			contBoton.appendChild(botonQuitar);


			contInput.appendChild(contBoton);
			contenedor.appendChild(contInput);

			cantCamposHijos++;

		}


		function quitarHijo(id){
			var elemento = "contInput"+id;
			document.getElementById(elemento).remove();
		}



		function limpiarTodoslosCamposHijos(){
			var contenedor = document.getElementById("contHijos");
  			contenedor.innerHTML = "";
  			cantCamposHijos = 0;
		}
