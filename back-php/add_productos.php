<?php 
require_once 'clases/respuestas.class.php';
require_once 'clases/producto.class.php';
$_respuestas = new respuestas;
$_producto = new producto;

if($_SERVER['REQUEST_METHOD'] == "POST"){
    if($_POST['accion']=="POST" || $_POST['accion']=="INSERTAR"){
        foreach($_FILES["img"]['tmp_name'] as $key => $tmp_name){
            //Validamos que el archivo exista
		if($_FILES["img"]["name"][$key]) {
			$filename = $_FILES["img"]["name"][$key]; //Obtenemos el nombre original del archivo
			$source = $_FILES["img"]["tmp_name"][$key]; //Obtenemos un nombre temporal del archivo
			
			$directorio = 'img/'; //Declaramos un  variable con la ruta donde guardaremos los archivos
			
			//Validamos si la ruta de destino existe, en caso de no existir la creamos
			if(!file_exists($directorio)){
				mkdir($directorio, 0777) or die("No se puede crear el directorio de extracci&oacute;n");	
			}
			
			$dir=opendir($directorio); //Abrimos el directorio de destino
			$target_path = $directorio.'/'.$filename; //Indicamos la ruta de destino, así como el nombre del archivo
			
			//Movemos y validamos que el archivo se haya cargado correctamente
			//El primer campo es el origen y el segundo el destino
			if(move_uploaded_file($source, $target_path)) {	
				
				} else {	
				echo json_encode("Ha ocurrido un error, por favor inténtelo de nuevo.<br>") ;
			}
			closedir($dir); //Cerramos el directorio de destino
		}
        }
        $datos=$_POST['datos'];
           if ($_POST['accion']=="INSERTAR") {
            $Res_data = $_producto->Producto_Insert($datos);
            echo json_encode($Res_data)  ;
           }else{
            $Res_data = $_producto->Producto_Update($datos);
            echo json_encode( $Res_data);
           }
          
                
    }else if ($_POST['accion']=="PUT") {
        $datos=$_POST['datos'];
        $Res_data = $_producto->Producto_Update($datos);
        echo json_encode( $Res_data);
        
        
    }else{
        echo json_encode( "nada");
    }
    http_response_code(200);
}


?>