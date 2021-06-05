<?php 

header('Content-type: Application/JSON');
//LAs rutas internas
require_once "rutas.php";
//La clase para el routeo
//Todos los includes, no es necesario, pero ayuda a odenar
require_once CONFIG.'includes.php';

session_start();


 try {
  	$_SESSION['mazoNuevo'] = new Mazo();
    $_SESSION['mazoNuevo']->armarMazo();
    http_response_code(200);
    echo '{"Message" : "Mazo iniciado con exito"}';
  } catch (\Exception $e) {
    http_response_code(500);
    echo '{"Message" : "Error, no se pudo obtener mazo"}';
  }

?>