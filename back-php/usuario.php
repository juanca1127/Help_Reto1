<?php
require_once 'clases/respuestas.class.php';
require_once 'clases/clientes.class.php';

$_respuestas = new respuestas;
$_clientes = new clientes;

if($_SERVER['REQUEST_METHOD'] == "GET"){
    if(isset($_GET['id'])){
        $clienteID = $_GET['id'];
        $clientes_data = $_clientes->obtenerCliente($clienteID);
        header("Content-Type: application/json");
        echo json_encode($clientes_data);
        http_response_code(200);
    }else{
        $listaClientes = $_clientes->listaClientes();
        header("Content-Type: application/json");
        echo json_encode($listaClientes);
        http_response_code(200);
    } 
}else if($_SERVER['REQUEST_METHOD'] == "DELETE"){
    $postBody = file_get_contents("php://input");
    $cliente_data = $_clientes->Eliminar($postBody);
    header("Content-Type: application/json");
        echo json_encode($cliente_data);
        http_response_code(200);

}

?>