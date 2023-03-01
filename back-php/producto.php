<?php
require_once 'clases/respuestas.class.php';
require_once 'clases/producto.class.php';

$_respuestas = new respuestas;
$_producto = new producto;


if($_SERVER['REQUEST_METHOD'] == "GET"){
     if(isset($_GET['id'])){
        $productoID = $_GET['id'];
        $producto_data = $_producto->obtenerProducto($productoID);
        header("Content-Type: application/json");
        echo json_encode($producto_data);
        http_response_code(200);
     

    }else{
    $listaProducto = $_producto->listaProducto();
    header("Content-Type: application/json");
    echo json_encode($listaProducto);
    http_response_code(200);
}

}else if($_SERVER['REQUEST_METHOD'] == "DELETE"){
    $postBody = file_get_contents("php://input");
    $res_data = $_producto->deleteProducto($postBody);
    header('Content-Type: application/json');
    echo json_encode( $res_data);
 }


?>