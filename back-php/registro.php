<?php 
require_once 'clases/registro.class.php';
require_once 'clases/respuestas.class.php';

$_registro = new registro;
$_respuestas = new respuestas;
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $postBody = file_get_contents("php://input");
  $res =  $_registro->register($postBody);
    header("Content-Type: application/json");
    echo json_encode($res) ;
}else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
  $postBody = file_get_contents("php://input");
  $res =  $_registro->UpdateUser($postBody);
  header("Content-Type: application/json");
    echo json_encode($res) ;

}else{
    header('Content-Type: application/json');
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}
?>