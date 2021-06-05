<?php 
class Mazo{
	private $mazo = array();

	/**
	 * Carga todos los valores de las cartas en array
	 * 
	 * Utiliza l objeto carta que tiene valor, palo e imagen
	 */
	public function armarMazo(){
		$numero = 1;
		$palo = "basto";

		for ($i = 0; $i < 48; $i++) {
			$c = new Carta($palo, $numero);
			array_push($this->mazo, $c);
			$numero++;
	        if ($numero == 13) {
	            $numero = 1;
	            switch($palo) {
	                case "basto":
	                    $palo = "copa";
	                    break;
	                case "copa":
	                    $palo = "espada";
	                    break;
	                default:
	                    $palo = "oro";
	            }
	        }
		}
	}//Fin función armarMazo


	/**
	 * Elimina del mazo la carta seleccionada
	 * 
	 * 
	 */
	public function quitarDelMazo($pos){
		unset($this->mazo[$pos]);
		$this->mazo = array_values($this->mazo); //Para reordenarlo
	}


	/**
	 * Devuelve carta del mazo
	 * 
	 * Desde el maso al azar devuelve un valor para mostrar el objeto carta
	 * También la elimina del array para respetar el mazo
	 * 
	 * @return objeto carta
	 */
	public function darCarta(){
		if(count($this->mazo) != 0){
			$pos = rand(0, count($this->mazo)-1);
			$carta = $this->mazo[$pos];
			$this->quitarDelMazo($pos);
			return $carta;
		}
		return 0;
	}

	/**
	 *Muestra todo el mazo 
	 * 
	 * 
	 */
	public function mostrarMazo(){
		return $this->mazo;
	}

	/**
	 * Meustra varios datos al dar la carta
	 * 
	 * 
	 */ 
	public function mostrarDatos(){
		$carta = $this->darCarta();
		if ($carta == null) {
			$carta = "No quedan cartas";
		}
		$restan = count($this->mazo);
		$datosJSON = array("restan"=>$restan, "carta"=>$carta);

		return $datosJSON;
	}


}


?>