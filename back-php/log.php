<?php
require_once 'clases/respuestas.class.php';
require_once 'clases/producto.class.php';

$_respuestas = new respuestas;
$_producto = new producto;


if($_SERVER['REQUEST_METHOD'] == "GET"){
    $logR = $_producto->log();
    header("Content-Type: application/json");
    echo json_encode($logR);
    http_response_code(200);
}



?>