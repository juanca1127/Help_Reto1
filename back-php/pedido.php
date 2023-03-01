<?php


require_once 'clases/respuestas.class.php';
require_once 'clases/pedido.class.php';

$_respuestas = new respuestas;
$_pedido = new pedido;
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $postBody = file_get_contents("php://input");
    $datosArray = $_pedido->insertPedido($postBody);
    header('Content-Type: application/json');
    echo json_encode( $datosArray);

}else if($_SERVER['REQUEST_METHOD'] == "GET"){
   
    if (isset($_GET['id']) && isset($_GET['cod'])){
       $id = $_GET['id'];
       $cod = $_GET['cod'];
       $res = $_pedido->obtenerPedido_id($id,$cod);
       header("Content-Type: application/json");
       echo json_encode($res);
       http_response_code(200);
    }else if (isset($_GET['id'])){
        $data = $_GET['id'];
        
        $res = $_pedido->obtenerPedido($data);
                header("Content-Type: application/json");
                echo json_encode($res);
                http_response_code(200);
    

    }else{
         header('Content-Type: application/json');
         $datosArray = $_respuestas->error_405();
         echo json_encode($datosArray);
        
     }
   
}else if ($_SERVER['REQUEST_METHOD'] == "DELETE"){
    $postBody = file_get_contents("php://input");
    $res_data = $_pedido->deletePedido($postBody);
    header('Content-Type: application/json');
    echo json_encode( $res_data);
}else if ($_SERVER['REQUEST_METHOD'] == "PUT"){
    $postBody = file_get_contents("php://input");
    $datosArray = $_pedido->reversePedido($postBody);
   echo json_encode( $datosArray);

}
else{
    header('Content-Type: application/json');
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}

?>