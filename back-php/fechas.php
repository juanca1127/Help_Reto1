<?php

require_once 'clases/fechas.class.php';

$_fechas = new fechas;

 if($_SERVER['REQUEST_METHOD'] == "POST"){
    $postBody = file_get_contents("php://input");
    $fechaData = $_fechas->RecaudoMes($postBody);
    header("Content-Type: application/json");
        echo json_encode($fechaData);
        http_response_code(200);

}

?>