<?php 

class Carta implements JsonSerializable{
	private $palo;
	private $numero;
	private $img;

	public function __construct($palo, $numero){
		$this->palo = $palo;
		$this->numero = $numero;
		$this->img = "img/".$palo."/".$numero.".png"; 
	}

	public function jsonSerialize() {
        return get_object_vars($this);
     }


}


?>