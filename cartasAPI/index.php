<?php
header('Content-type: Application/JSON');
//LAs rutas internas
require_once "rutas.php";
//La clase para el routeo
require_once CONFIG.'router/autoload.php';
//Todos los includes, no es necesario, pero ayuda a odenar
require_once CONFIG.'includes.php';

//Inicio el enrutador
$router = new AltoRouter();

//Mi directorio base
$router->setBasePath('https://acmolino.github.io/cartasAPI/');
session_start();

/**
*
*
*
*/
$router->map('GET', '/iniciarMazo', function() {
  try {
  	$_SESSION['mazoNuevo'] = new Mazo();
    $_SESSION['mazoNuevo']->armarMazo();
    http_response_code(200);
    echo '{"Message" : "Mazo iniciado con exito"}';
  } catch (\Exception $e) {
    http_response_code(500);
    echo '{"Message" : "Error, no se pudo obtener mazo"}';
  }
});

/**
*
*
*
*/
$router->map('GET', '/darCarta', function() { 
  try {
    echo json_encode($_SESSION['mazoNuevo']->mostrarDatos(), JSON_PRETTY_PRINT);
    http_response_code(200);
  } catch (\Exception $e) {
    http_response_code(500);
    echo '{"Message" : "Error al dar la carta"}';
  }
});


/**
*Necesario para el routeo
*
*
*/
$match = $router->match();
if( is_array($match) && is_callable( $match['target'] ) ) {
  call_user_func_array( $match['target'], $match['params'] );
} else {
  // no route was matched
  header( $_SERVER["SERVER_PROTOCOL"] . ' 403 Not Found');
}

?>
