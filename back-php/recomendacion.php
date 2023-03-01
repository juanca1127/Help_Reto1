<?php 
require_once 'clases/respuestas.class.php';
require_once 'clases/producto.class.php';

$_respuestas = new respuestas;
$_producto = new producto;

if($_SERVER['REQUEST_METHOD'] == "GET"){
    $id = $_GET['id'];
    $loc = $_GET['location'];
    $producto_data = $_producto->Recomendacion($id,$loc);
    header("Content-Type: application/json");
    echo json_encode($producto_data);
    http_response_code(200);
}

?>