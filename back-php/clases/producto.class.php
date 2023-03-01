<?php
require_once "conexion/conexion.php";
require_once "respuestas.class.php";


class producto extends conexion {
    
  
    public function listaProducto(){
        
        $query = "SELECT * FROM `productos` WHERE stock >0 ORDER BY `productos`.`codigo_producto` DESC";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }

    public function log(){
        
        $query = "SELECT * FROM `log`";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }
    public function deleteProducto($id){
        $mensaje = array();
        $query = "DELETE FROM `productos` WHERE codigo_producto = $id";
        $datos = parent::nonQuery($query);
        if (isset($datos)) {
             $mensaje = array(
                "status" =>"ok"
             );
            
        }else{

            $mensaje = array(
                "status" =>"Error"
            );
           
        }
        return ($datos);

    }


    public function  Producto_Insert($json){
        $mensaje = array();
        $datos = json_decode($json,true);
        foreach($datos as $clave=>$valor)
	{
    if (empty($valor)) {
        $mensaje['datos']= array("$clave" =>"esta vacio");
        return $mensaje;
       
    }else{
        $this -> $clave = $valor;
     };
	
	}
         $resp3 = $this-> Accion_Producto_Insert();
         if ($resp3 >0) {
            return $resp3;
         }else{
            return "No se pudo insertar";
         }
                 

    }

  
 
    
   
    public function  Producto_Update($json){
        $mensaje = array();
        $datos = json_decode($json,true);
        foreach($datos as $clave=>$valor)
	{
    if (empty($valor)) {
        $mensaje['datos']= array("$clave" =>"esta vacio");
        return $mensaje;
       
    }else{
        $this -> $clave = $valor;
     };
	
	}
         $resp3 = $this-> Accion_Producto_Update();
         if ($resp3>0) {
            return $resp3;
         }else{
            return "No se pudo insertar";
         }
    
        return  $resp3   ;

        
        
        
    }
    public function logRegistro(){
      
        $hoy = date("Y-m-d"); 
      $query="INSERT INTO `log`(`Registro`) VALUES ('Se actualizo la tabla el dia $hoy  el producto de nombre ". $this -> nombre." tiene un id ". $this -> codigo_producto ."')" ;
     $resp4 = parent::nonQuery($query);
      return  $resp4;

    }
    private function Accion_Producto_Insert(){
    
        
        
        $query = "INSERT  INTO productos  ( `nombre`, `descripcion`, `costo`, `valor`, `stock`, `stock_min`, `img1`)
        VALUES ('".$this -> nombre."','".$this ->descripcion."','".$this -> costo."','".$this ->valor."','".$this ->stock."',1,'".$this ->imagen."')";
         $resp4 = parent::nonQueryId($query);
         return    $resp4 ;
   
       
}
    private function Accion_Producto_Update(){
           $eje= $this ->logRegistro();

        
      $query="UPDATE `productos` SET `nombre`='". $this -> nombre."',`descripcion`='". $this -> descripcion."',
      `costo`='". $this -> costo."',`valor`='". $this -> valor."',
      `stock`='". $this -> stock."',`stock_min`='". $this -> stock_min."',
      `img1`='". $this -> img1."'  WHERE `codigo_producto`= '". $this -> codigo_producto."'";
         $resp2 = parent::nonQuery($query);
   
        return   $resp2;
}



    public function obtenerProducto($id){
     
        $query = "SELECT * FROM `productos` WHERE codigo_producto =$id ";
        return parent::obtenerDatos($query);

    }
    

    
   

  
    
    
    


    


    


    


    


  



}





?>