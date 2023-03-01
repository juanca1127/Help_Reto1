<?php
require_once 'clases/pedido.class.php';

$_pedido = new pedido;

if($_SERVER['REQUEST_METHOD'] == "GET"){
  
        $cliente_data = $_pedido->obtenerPedidoGeneral();
        header("Content-Type: application/json");
        echo json_encode($cliente_data);
        http_response_code(200);
   
}else if($_SERVER['REQUEST_METHOD'] == "POST") {
        $postBody = file_get_contents("php://input");
        $datosArray = $_pedido->insertGuia($postBody);
        header('Content-Type: application/json');
        echo json_encode( $datosArray);

}else{
        echo json_encode("no permitido");
        http_response_code(400);
}

?>